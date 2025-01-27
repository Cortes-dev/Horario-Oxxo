import React, { useState, useEffect } from 'react';
import { TableFunction } from '../functions/TableHorario';
import html2canvas from 'html2canvas';

const { dias, usuarios, horariosCompletos, horariosButton } = TableFunction();

export default function ScheduleGrid() {
    const [selectedShifts, setSelectedShifts] = useState(new Set());
    const [scheduleData, setScheduleData] = useState([]);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + (1 - startDate.getDay())); //! Primer día de la próxima semana
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); //! Último día de la próxima semana

    useEffect(() => {
        const savedShifts = JSON.parse(localStorage.getItem('selectedShifts')) || [];
        const savedSchedule = JSON.parse(localStorage.getItem('scheduleData')) || [];

        setSelectedShifts(new Set(savedShifts));
        setScheduleData(savedSchedule.length ? savedSchedule : generateSchedule());
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedShifts', JSON.stringify(Array.from(selectedShifts)));
        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
    }, [selectedShifts, scheduleData]);

    const getRandomShift = () => horariosCompletos[Math.floor(Math.random() * horariosCompletos.length)];

    const generateSchedule = () => usuarios.map(usuario => ({
        name: usuario,
        schedule: Array(7).fill(null).map(() => getRandomShift()),
    }));

    const horariosButton = ['Primera', 'Segunda', 'Tercera', 'Descanso'];

    const toggleDescanso = (personIndex, shiftIndex) => {
        setScheduleData(prevSchedule =>
            prevSchedule.map((person, i) =>
                i === personIndex
                    ? {
                        ...person,
                        schedule: person.schedule.map((shift, j) => {
                            if (j === shiftIndex) {
                                // Encuentra el índice actual en horariosButton
                                const currentIndex = horariosButton.indexOf(shift);
                                // Calcula el siguiente índice en el array
                                const nextIndex = (currentIndex + 1) % horariosButton.length;
                                return horariosButton[nextIndex]; // Retorna el siguiente turno
                            }
                            return shift;
                        }),
                    }
                    : person
            )
        );
    };



    const randomizeSchedule = () => {
        setScheduleData(generateSchedule());
        setSelectedShifts(new Set());
    };

    const shareAsImage = () => {
        const tableElement = document.querySelector("#schedule-table");

        html2canvas(tableElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: null,
        }).then(canvas => {
            canvas.toBlob(blob => {
                if (blob) {
                    const shareData = {
                        title: 'Horario',
                        text: 'Aquí está el horario de la semana.',
                        files: [new File([blob], 'horario.png', { type: 'image/png' })],
                    };
                    navigator.share(shareData).catch(console.error);
                }
            });
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-1 text-[10px] lg:text-lg">
            <div  className="bg-slate-900 block w-full p-5 lg:p-8 rounded-lg shadow-xl">
                <h2 className="text-center text-white text-sm flex justify-around items-center mb-4 lg:text-lg md:block">
                    Semana{' '}
                    <span className='font-bold bg-red-800 rounded-md py-1 px-2 mx-1'>
                        {startDate.toLocaleDateString()}
                    </span>
                    al{' '}
                    <span className='font-bold bg-red-800 rounded-md py-1 px-2 mx-1'>
                        {endDate.toLocaleDateString()}
                    </span>
                </h2>

                {/* Tabla oculta en móviles */}
                <div className="p-4 w-full overflow-x-auto">
                    <div id="schedule-table" className="block min-w-[600px] bg-slate-900 p-3">
                        <div className="grid grid-cols-8 gap-2">
                            {/* Header Row */}
                            <div className="p-2 text-center border flex items-center justify-center border-gray-600 rounded bg-slate-800 text-white">
                                Horario
                            </div>
                            {dias.map((day, index) => (
                                <div
                                    key={day}
                                    className={`p-2 text-center border border-gray-600 rounded ${index === 3 ? 'bg-green-800 text-white' : 'bg-red-800 text-white'
                                        }`}>
                                    {day}
                                    <span className="block text-xs">
                                        {new Date(
                                            startDate.getTime() + index * 24 * 60 * 60 * 1000
                                        )
                                            .toLocaleDateString()
                                            .split('/')
                                            .join('-')}
                                    </span>
                                </div>
                            ))}
                            {/* Schedule Rows */}
                            {scheduleData.map((person, personIndex) => (
                                <React.Fragment key={person.name}>
                                    <div className="p-2 text-center border flex items-center justify-center border-gray-600  rounded bg-slate-800 text-white">
                                        {person.name}
                                    </div>
                                    {/* Horarios */}
                                    {person.schedule.map((shift, shiftIndex) => {
                                        const key = `${personIndex}-${shiftIndex}`;
                                        return (
                                            <div
                                                key={key}
                                                className={`p-1 text-center ${selectedShifts.has(key) ? 'border-green-700' : ''
                                                    } border text-sm flex items-center justify-center border-gray-600 rounded bg-slate-800 text-white`}>

                                                <button
                                                    type="button"
                                                    onClick={() => toggleDescanso(personIndex, shiftIndex)}
                                                    className={`px-2 py-1 rounded font-bold text-center 
        ${person.schedule[shiftIndex] === 'Descanso' ? 'text-green-500 bg-slate-900' : ''}`}
                                                >
                                                    {person.schedule[shiftIndex]}
                                                </button>


                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-center mt-6 xl:justify-end mb-4">
                <button
                    type="button"
                    onClick={randomizeSchedule}
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                    Aleatorizar Horario
                </button>
                <button
                    type="button"
                    onClick={shareAsImage}
                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                >
                    Compartir Tabla
                </button>
            </div>
        </div>
    );
}
