export const TableFunction = () => {
    const dias = ['Personal', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const horarios = [
        {
            primera: '7:00 AM - 3:00 PM',
            segunda: '3:00 PM - 11:00 PM',
            tercera: '11:00 PM - 7:00 AM',
        }];


    const horariosCompletos = horarios.map((horario) => Object.values(horario));
    const usuarios = ['Diego', 'Ester', 'Marta', 'Victor', 'Servando', 'Manuel', 'Nancy', 'Alejandra', 'Adriana'];

    return { dias, usuarios, horariosCompletos };
};
