import React, { useState, useEffect } from 'react';
import { TableFunction } from '../functions/TableHorario';
import html2canvas from 'html2canvas';

const { dias, usuarios, horariosCompletos } = TableFunction();

export default function ScheduleGrid() {
    const [selectedShifts, setSelectedShifts] = useState(new Set());
    const [scheduleData, setScheduleData] = useState([]);
    const [descanso, setDescanso] = useState([]);

    // Fechas para mostrar el rango de la semana
    const startDate = new Date(); // Cambia esto según tu lógica
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Primer día de la semana
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Último día de la semana

    useEffect(() => {
        const savedShifts = JSON.parse(localStorage.getItem('selectedShifts')) || [];
        const savedSchedule = JSON.parse(localStorage.getItem('scheduleData')) || [];
        const savedDescanso = JSON.parse(localStorage.getItem('Descanso')) || [];

        setSelectedShifts(new Set(savedShifts));
        setScheduleData(savedSchedule.length ? savedSchedule : generateSchedule());
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedShifts', JSON.stringify(Array.from(selectedShifts)));
        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
        localStorage.setItem('Descanso', JSON.stringify(Array.from(selectedShifts)));
    }, [selectedShifts, scheduleData]);

    const getRandomShift = () => {
        return horariosCompletos[0][Math.floor(Math.random() * horariosCompletos[0].length)];
    };

    const generateSchedule = () => {
        return usuarios.map((usuario) => ({
            name: usuario,
            schedule: Array(7).fill(null).map(() => getRandomShift()),
        }));
    };

    const toggleDescanso = (personIndex, shiftIndex) => {
        const key = `${personIndex}-${shiftIndex}`;
        const newSelectedShifts = new Set(selectedShifts);

        if (newSelectedShifts.has(key)) {
            newSelectedShifts.delete(key);
        } else {
            newSelectedShifts.add(key);
        }

        setSelectedShifts(newSelectedShifts);
    };

    const randomizeSchedule = () => {
        setScheduleData(generateSchedule());
    };

    // Función para compartir como imagen
    const shareAsImage = () => {
        html2canvas(document.querySelector("#schedule-table")).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'horario.png';
            link.click();
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="bg-slate-900 p-8 rounded-lg shadow-xl">
                <h2 className="text-center text-white mb-4">
                    Semana del {startDate.toLocaleDateString()} al {endDate.toLocaleDateString()}
                </h2>
                <div className="flex justify-end mb-4">
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
                <div id="schedule-table" className="grid grid-cols-8 gap-2 p-4">
                    {/* Header Row */}
                    {dias.map((day, index) => (
                        <div
                            key={day}
                            className={`p-2 text-center border border-gray-600 rounded ${index === 0 || index === 4
                                    ? 'bg-green-800 text-white'
                                    : 'bg-red-800 text-white'
                                }`}
                        >
                            {day}
                            {index === 4 && (
                                <span className="block text-xs">(Hoy pagan)</span>
                            )}
                        </div>
                    ))}

                    {/* Schedule Grid */}
                    {scheduleData.map((person, personIndex) => (
                        <React.Fragment key={person.name}>
                            {/* Name Cell */}
                            <div className="p-2 text-center border flex items-center justify-center border-gray-600 rounded bg-slate-800 text-white">
                                {person.name}
                            </div>
                            {/* Schedule Cells */}
                            {person.schedule.map((shift, shiftIndex) => {
                                const key = `${personIndex}-${shiftIndex}`;
                                return (
                                    <div
                                        key={key}
                                        className={`p-1 text-center ${selectedShifts.has(key) ? 'border-green-700' : ''
                                            } border text-sm flex items-center justify-center border-gray-600 rounded bg-slate-800 text-white`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleDescanso(personIndex, shiftIndex)}
                                            className={`${selectedShifts.has(key) ? 'font-bold text-green-500' : ''
                                                }`}
                                        >
                                            {selectedShifts.has(key) ? 'Descanso' : shift}
                                        </button>
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
