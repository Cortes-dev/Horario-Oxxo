import React, { useState, useMemo } from 'react';

const TableHorario = () => {
    const empleadosList = ['Diego', 'Nancy', 'Marta', 'Ester', 'Manuel', 'Adriana', 'Alejandra', 'Victor'];
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const turnos = [
        { turno: '7:00 AM - 3:00 PM' },
        { turno: '3:00 PM - 11:00 PM' },
        { turno: '11:00 PM - 7:00 AM' },
    ];

    const [empleados, setEmpleados] = useState([]);

    const generarHorario = () => {
        const turnosAsignados = {
            '7:00 AM - 3:00 PM': [],
            '3:00 PM - 11:00 PM': [],
            '11:00 PM - 7:00 AM': [],
        };

        // Asignar a Victor y otro empleado al turno de las 7:00 AM
        turnosAsignados['7:00 AM - 3:00 PM'].push('Victor');
        const otrosEmpleados = empleadosList.filter(emp => emp !== 'Victor');
        turnosAsignados['7:00 AM - 3:00 PM'].push(otrosEmpleados.pop());

        // Asignar los demás empleados a turnos aleatorios
        otrosEmpleados.forEach(nombreEmpleado => {
            let turnoValido;
            do {
                const turnoAleatorio = turnos[Math.floor(Math.random() * turnos.length)];
                if (turnosAsignados[turnoAleatorio.turno].length < 2) {
                    turnosAsignados[turnoAleatorio.turno].push(nombreEmpleado);
                    turnoValido = true;
                }
            } while (!turnoValido);
        });

        // Generar horarios
        const nuevosEmpleados = empleadosList.map(nombreEmpleado => ({
            nombre: nombreEmpleado,
            horario: dias.map(() => Object.keys(turnosAsignados).find(turno =>
                turnosAsignados[turno].includes(nombreEmpleado)))
        }));

        setEmpleados(nuevosEmpleados);
    };

    // Memorizar el renderizado de la tabla para evitar re-renderizados innecesarios
    const renderizarTabla = useMemo(() => (
        <tbody>
            {empleados.map((empleado, index) => (
                <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{empleado.nombre}</td>
                    {empleado.horario.map((horario, i) => (
                        <td key={i} className={`border border-gray-300 px-4 py-2`}>
                            {horario}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    ), [empleados]);

    return (
        <div>
            <button onClick={generarHorario} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                Generar Horario
            </button>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Empleado</th>
                        {dias.map((dia, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">{dia}</th>
                        ))}
                    </tr>
                </thead>
                {renderizarTabla}
            </table>
        </div>
    );
};

export default TableHorario;