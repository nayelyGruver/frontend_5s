import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Default export is a4 paper, portrait, using millimeters for units
export const generarPDF = (empresa, departamento, fecha,calificacion, lista_s, evaluacion) =>{
  const doc = new jsPDF();

  doc.autoTable({
    theme: 'plain',
    styles: { halign: 'center',  fontSize: 18 } ,
    // bodyStyles: { 0: { halign: 'center', fontSize: 14}, 2: { halign: 'center', fontSize: 14 }, 3: { halign: 'center',  fontSize: 14 } },
    columns :
    [{header: "",  dataKey: 'empresa' },
     {header: "Evaluación 5'S",  dataKey: 'departamento' },
     {header: "",  dataKey: 'fecha' }],
  })
  doc.autoTable({
    theme: 'plain',
    styles: { halign: 'center',  fontSize: 13  } ,
    // bodyStyles: { 0: { halign: 'center', fontSize: 14}, 2: { halign: 'center', fontSize: 14 }, 3: { halign: 'center',  fontSize: 14 } },
    columns :
    [{header: "",  dataKey: 'empresa' },
     {header: "",  dataKey: 'departamento' },
     {header: "",  dataKey: 'fecha' }],
    body: [
      { empresa: `Empresa: ${empresa}`, departamento: `Departamento: ${departamento}`, fecha: `Fecha: ${fecha}` },
      { empresa: ``, departamento: ``, fecha: `Calificación: ${calificacion}` }
    ],
  })
  let num = 1
  lista_s.forEach(s => {
    doc.autoTable({
      theme: 'plain',
      body: [
        { nombre_s: ` ${num}S.${s.nombre.toUpperCase() }`},
      ],
      columnStyles: { 0: {  fontSize: 12, fontStyle: 'bold', margin: 0 }}
    })
    num = num + 1
    doc.autoTable({
      styles: { fontSize: 9,  margin: 0 } ,
      columnStyles: { 0: { halign: 'center' }, 2: { halign: 'center'}, 3: { halign: 'center'} },
      theme: 'grid',
      columns :
      [
      {header: 'CRITERIO', dataKey: 'criterio'},
      {header: 'DESCRIPCION', dataKey: 'descripcion'},
      {header: 'PUNTOS', dataKey: 'puntos'},
      {header: 'CUMPLE', dataKey: 'puntos_obtenidos'},
      {header: 'OBSERVACIONES', dataKey: 'observaciones'}
      ],
      body : evaluacion.filter((row) => row.nombre_s === s.nombre),
    },

    )
  });

  doc.save(`evaluacion_5s_${empresa}_${departamento}_${fecha}.pdf`)

//   var pdf = new jsPDF();
// pdf.text(20,20,"Mostrando una Tabla con JsPDF y el Plugin AutoTable");

// var columns = ["Id", "Nombre", "Email", "Pais"];
// var data = [
// [1, "Hola", "hola@gmail.com", "Mexico"],
// [2, "Hello", "hello@gmail.com", "Estados Unidos"],
// [3, "Otro", "otro@gmail.com", "Otro"] ];

// pdf.autoTable(columns,data,
// { margin:{ top: 25 }}
// );


// pdf.save('mipdf.pdf');



}



