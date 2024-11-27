import React, { useState } from 'react';

const TableHorario = () => {
    // Lista de empleados
    const empleadosList = ['Diego', 'Nancy', 'Marta', 'Ester', 'Manuel', 'Adriana', 'Alejandra'];

    // Definir los días de la semana
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    // Los turnos disponibles
    const turnos = [
        { turno: '7:00 AM - 3:00 PM', horas: 8 },   // Turno 1
        { turno: '3:00 PM - 11:00 PM', horas: 8 },  // Turno 2
        { turno: '11:00 PM - 7:00 AM', horas: 8 },  // Turno 3
    ];

    // Estado para los horarios de los empleados
    const [empleados, setEmpleados] = useState([]);

    // Función para generar el horario automáticamente
    const generarHorario = () => {
        const nuevosEmpleados = [];

        // Asignamos turnos aleatorios a cada empleado
        empleadosList.forEach((nombreEmpleado) => {
            let horarioEmpleado = [];
            let ultimoTurno = null;

            // Asignamos turnos aleatorios a los días de la semana para este empleado
            for (let j = 0; j < dias.length; j++) {
                let turnoValido = false;
                let turnoAsignado = null;

                // Intentamos asignar un turno aleatorio
                while (!turnoValido) {
                    const turnoAleatorio = turnos[Math.floor(Math.random() * turnos.length)];

                    // Verificar si el turno asignado no es consecutivo o demasiado cercano al anterior
                    if (ultimoTurno === null || Math.abs(ultimoTurno.horas - turnoAleatorio.horas) >= 8) {
                        turnoAsignado = turnoAleatorio;
                        turnoValido = true;
                    }
                }

                // Asignamos el turno al empleado para ese día
                horarioEmpleado.push(turnoAsignado.turno);
                ultimoTurno = turnoAsignado; // Guardamos el último turno asignado
            }

            // Agregamos el nuevo empleado con su horario a la lista
            nuevosEmpleados.push({ nombre: nombreEmpleado, horario: horarioEmpleado });
        });

        // Una vez que hemos generado todos los horarios, actualizamos el estado
        setEmpleados(nuevosEmpleados);
    };

    return (
        <div>
            {/* Botón para generar horario */}
            <button
                onClick={generarHorario}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Generar Horario
            </button>

            {/* Tabla con los horarios */}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Empleado</th>
                        {dias.map((dia, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">
                                {dia}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{empleado.nombre}</td>
                            {empleado.horario.map((horario, i) => (
                                <td key={i} className="border border-gray-300 px-4 py-2">
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
