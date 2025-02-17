import React, {  useContext, useEffect, useState } from 'react';
import { usaTema } from '../context/ClaroOscuroProvider';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { Bar, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement} from 'chart.js';
import { color } from 'chart.js/helpers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const CSV_FILE_PATH = '/200125_LoL_champion_data.csv';

export const Informes = () =>{
    const[difficulty, setDifficulty] = useState('');
    const[hero, setHero]=useState('');
    const[message, setMessage] = useState('');
    const [heroes, setHeroes] = useState([]);
    const [laneData, setLaneData] = useState({});
    const [activeTab, setActiveTab] = useState('bar');
    const{colores}=usaTema();

    useEffect(() => {
        console.log('Intentando cargar el archivo CSV...');
        fetch(CSV_FILE_PATH)
            .then(response => {if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
            .then(csvString => {
                console.log('CSV cargado, longitud:', csvString.length);
                Papa.parse(csvString, {
                    complete: (result) => {
                        console.log('Muestra de datos crudos:', result.data.slice(0, 5));
                        const heroesData = result.data.filter(row => row.length ===33).map(item => {
                            console.log('Dificultad raw:', item[3]);
                            return {
                                id: item[1],
                                nombre: item[2],
                                titulo: item[3],
                                dificultad: item[4],
                                tipo1: item[5],
                                tipo2: item[6],
                                lanes: item[14]
                            };
                        });
                        console.log('Muestra de héroes procesados:', heroesData.slice(0, 5));
                        setHeroes(heroesData);
                        console.log('Héroes cargados:', heroesData);
                        const laneCount2 = {
                            Top: heroesData.filter(h => h.lanes.includes('Top')).length,
                            Middle: heroesData.filter(h => h.lanes.includes('Middle')).length,
                            Bottom: heroesData.filter(h => h.lanes.includes('Bottom')).length,
                            Jungle: heroesData.filter(h => h.lanes.includes('Jungle')).length
                        };
                        setLaneData(laneCount2);
                        console.log('laneData inicial:', laneCount2); 
                    },
                    header: false,
                    skipEmptyLines: true
                });
            })
            .catch(error => console.error('Error al cargar el archivo CSV:', error));
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('Dificultad seleccionada:', difficulty);
        console.log('Tipo de héroe seleccionado:', hero);
        console.log('Total de héroes antes del filtro:', heroes.length);
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text("Campeones", 105, 10, {align:'center'});

        doc.setFontSize(16);
        doc.text(`Estos son los héroes con dificultad ${difficulty} y del tipo ${hero}`, 105, 40, {align:'center'});

        const filteredHeroes = heroes.filter(h => 
        {
            console.log('Héroe siendo filtrado:', h);
            const difficultyMatch = difficulty.toString() === ''|| h.dificultad.toString().trim() === difficulty.toString().trim();
            const heroTypeMatch = hero ==='' ||( h.tipo1 && h.tipo1.toString().trim().toLowerCase() === hero.trim().toLowerCase()) || (h.tipo2 && h.tipo2.toString().trim().toLowerCase() === hero.trim().toLowerCase())
            console.log('Coincidencia de dificultad:', difficultyMatch);
            console.log('Coincidencia de tipo:', heroTypeMatch);
            return difficultyMatch && heroTypeMatch;
        }
        );

        if(filteredHeroes.length===0){
            setMessage(`No se encontraron campeones que coincidan concidan con dificultad ${difficulty} y de tipo ${hero}.`);
            return;
        }

        setMessage("");

        console.log('Héroes filtrados:', filteredHeroes);

        const laneCount = {
            Top: filteredHeroes.filter(h => h.lanes.includes('Top')).length,
            Middle: filteredHeroes.filter(h => h.lanes.includes('Middle')).length,
            Bottom: filteredHeroes.filter(h => h.lanes.includes('Bottom')).length,
            Jungle: filteredHeroes.filter(h => h.lanes.includes('Jungle')).length
        };

        const tableData = filteredHeroes.map(h => [
            h.id, 
            h.nombre, 
            h.titulo, 
            h.dificultad, 
            h.tipo1, 
            h.tipo2, 
            h.lanes
        ]);

        let finalY;

        autoTable(doc, {
            head: [['Id', 'Nombre', 'Título', 'Dificultad', 'Tipo1','Tipo2', 'Lanes' ]],
            body: tableData,
            foot:[[`Total de heroes: ${filteredHeroes.length}`]],
            theme: 'grid',
            styles: {
                textColor: colores.primario, 
                lineColor: colores.texto,
                lineWidth: 0.1,
                fontSize: 12
            },
            headStyles: {
                fillColor: colores.primario,
                textColor: colores.texto 
            },
            bodyStyles: {
                textColor: colores.texto
            },
            alternateRowStyles: {
                fillColor: colores.secundario 
            },
            footStyles: {
                textColor: colores.texto,
                fillColor: colores.primario 
            },
            didDrawPage: function (data) {
                finalY = data.cursor.y;
            }
        })

        const maxWidth = 180;
        doc.setFontSize(12)
        doc.text(`Estos son el heroes de tipo ${hero} con dificultad ${difficulty}, tenemos ${filteredHeroes.length} heroes con esas caracteristicas, 
            ${laneCount.Top} son top lane, ${laneCount.Middle} son mid lane, ${laneCount.Bottom} son bot lane y 
            ${laneCount.Jungle} son junglas.`, 105, finalY+20, {align:'center', maxWidth:maxWidth});
        doc.save("campeones.pdf");
    };


    const BarChart = ({ data }) => {
        const chartData = {
            labels: Object.keys(data),
            datasets: [
                {
                    label: 'Número de héroes',
                    data: Object.values(data),
                    color: colores.texto,
                    backgroundColor: 'rgba(178, 111, 184, 0.6)',
                    borderColor: 'rgba(178, 111, 184, 1)',
                    borderWidth: 1,
                },
            ],
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Distribución de héroes por carril',
                },
            },
        };
        return <Bar data={chartData} options={options} />;
    };

    const PieChart = ({ data }) => {
        const chartData = {
            labels: Object.keys(data),
            datasets: [
                {
                    data: Object.values(data),
                    backgroundColor: [
                        'rgba(249, 132, 158, 0.6)',
                        'rgba(160, 106, 214, 0.6)',
                        'rgba(118, 125, 209, 0.6)',
                        'rgba(103, 197, 142, 0.6)',
                    ],
                    borderColor: [
                        'rgba(249, 132, 158, 1)',
                        'rgba(160, 106, 214, 1)',
                        'rgba(118, 125, 209, 1)',
                        'rgba(103, 197, 142, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Distribución de héroes por carril',
                },
            },
        };

        return <Pie data={chartData} options={options} />;
    };
    

    return(
        <>
            <div className='container mt-5' style={{background:colores.fondo, color:colores.texto}}>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                    <form onSubmit={handleSubmit}> 
                        <select className="form-select" aria-label="Default select example" onChange={(e)=>setDifficulty(e.target.value)}>
                            <option value="" selected>Difficulty</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>

                        <select className="form-select" aria-label="Default select example" onChange={(e)=>setHero(e.target.value)}>
                            <option value="" selected>Herotype</option>
                            <option value="Fighter">Fighter</option>
                            <option value="Mage">Mage</option>
                            <option value="Assasin">Assasin</option>
                            <option value="Marksman">Marksman</option>
                            <option value="Tank">Tank</option>
                            <option value="Support">Support</option>
                        </select>

                        <div className='text-center'>
                        <button type="submit" className="btn btn-sm" style={{backgroundColor:colores.primario, color:colores.texto}}>Imprimir</button>
                        </div>
                    </form>
                    {message && <p className='alert alert-info'>{message}</p>}
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-12'>
                        <ul className="nav nav-tabs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <li className="nav-item ">
                                <a className={`nav-link ${activeTab === 'bar' ? 'active' : ''}`} onClick={() => setActiveTab('bar')} style={{color:colores.texto, backgroundColor:activeTab==='bar' ? colores.secundario:colores.primario}} href="#">Gráfico de Barras</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'pie' ? 'active' : ''}`} onClick={() => setActiveTab('pie')} style={{color:colores.texto, backgroundColor:activeTab==='pie' ? colores.secundario:colores.primario}} href="#">Gráfico Circular</a>
                            </li>
                        </ul>
                        <div className='tab-content mt-3 '>
                            <div style={{width: '40%', margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
                                {activeTab === 'bar' && <BarChart data={laneData} />}
                                {activeTab === 'pie' && <PieChart data={laneData} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}