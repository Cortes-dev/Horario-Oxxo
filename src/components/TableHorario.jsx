import React, { useState } from 'react';

const TableHorario = () => {
    const empleadosList = [
        'Diego',
        'Nancy',
        'Marta',
        'Servando',
        'Ester',
        'Manuel',
        'Adriana',
        'Alejandra'
    ];

    const dias = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo'
    ];

    const turnos = [
        { turno: '7:00 AM - 3:00 PM', horas: 8 },
        { turno: '3:00 PM - 11:00 PM', horas: 8 },
        { turno: '11:00 PM - 7:00 AM', horas: 8 },
    ];

    const [empleados, setEmpleados] = useState([]);

    const generarHorario = () => {
        const nuevosEmpleados = [];
        const diasDescanso = dias.map((_, index) => index).sort(() => Math.random() - 0.5);

        empleadosList.forEach((nombreEmpleado, index) => {
            let horarioEmpleado = [];
            let diaDescanso = diasDescanso[index];
            let turnoAnterior = null; // Para rastrear el turno anterior del empleado

            for (let j = 0; j < dias.length; j++) {
                if (j === diaDescanso) {
                    horarioEmpleado.push('Día de descanso');
                    turnoAnterior = null; // Reinicia turno anterior
                } else {
                    let turnoElegido;

                    do {
                        turnoElegido = turnos[Math.floor(Math.random() * turnos.length)];
                    } while (
                        // Evitar asignar turno matutino después del turno de noche
                        (turnoAnterior === '11:00 PM - 7:00 AM' && turnoElegido.turno === '7:00 AM - 3:00 PM')
                    );

                    horarioEmpleado.push(turnoElegido.turno);
                    turnoAnterior = turnoElegido.turno; // Actualiza el turno anterior
                }
            }

            nuevosEmpleados.push({ nombre: nombreEmpleado, horario: horarioEmpleado });
        });

        nuevosEmpleados.push({
            nombre: 'Víctor',
            horario: dias.map(() => 'Líder')
        });

        setEmpleados(nuevosEmpleados);
    };

    return (
        <div className="overflow-x-auto">
            <button
                onClick={generarHorario}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded md:px-6 md:py-3 hover:bg-blue-600"
            >
                Generar Horario
            </button>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                            Empleado
                        </th>
                        {dias.map((dia, index) => (
                            <th
                                key={index}
                                className="border border-gray-300 px-2 py-1 md:px-4 md:py-2"
                            >
                                {dia}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 font-bold px-2 py-1 text-center md:px-4 md:py-2">
                                {empleado.nombre}
                            </td>
                            {empleado.horario.map((horario, i) => (
                                <td
                                    key={i}
                                    className={`border text-sm border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center ${horario === 'Día de descanso'
                                            ? 'bg-[#479902] text-white font-semibold'
                                            : horario === 'Líder'
                                                ? 'bg-gray-300 text-black font-semibold'
                                                : ''
                                        }`}
                                >
                                    {horario}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default TableHorario;
