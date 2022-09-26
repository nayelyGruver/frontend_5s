import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Default export is a4 paper, portrait, using millimeters for units
export const generarPDF = (empresa, departamento, fecha,calificacion, lista_s, evaluacion, evidencias) =>{
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


  // GENERAR HORA PARA EVIDENCIAS
  const areasEnBuenasCondiciones =  evidencias.filter(evidencia => evidencia.id_area === 1)
  const areasDeOportunidad =  evidencias.filter(evidencia => evidencia.id_area === 2)
  const areasParaMantenimiento =  evidencias.filter(evidencia => evidencia.id_area === 3)

  console.log(areasEnBuenasCondiciones)
  console.log(areasDeOportunidad)
  console.log(areasParaMantenimiento)

  doc.addPage("a4","p")
  doc.getFontSize(26)
  doc.text(90, 20,"Evidencias 5's");
  doc.getFontSize(12)
  doc.text(20, 30,"Areas en Buen Estado");
  let posicionX = 30
  areasEnBuenasCondiciones.forEach(evidencia => {
    doc.addImage(evidencia?.path_foto,'jpg', posicionX ,35, 70, 70, evidencia?.path_foto , 'NONE', 0 )
    posicionX = posicionX + 90
  })

  doc.text(20, 120,"Areas de Oportunidad");
  posicionX = 30
  areasDeOportunidad.forEach(evidencia => {
    doc.addImage(evidencia?.path_foto,'jpg', posicionX , 125, 70, 70, evidencia?.path_foto, 'NONE', 0 )
    posicionX = posicionX + 90
  })

  doc.text(20, 210,"Areas para mantenimiento");
  posicionX = 30
  areasParaMantenimiento.forEach(evidencia => {
    doc.addImage(evidencia?.path_foto,'jpg', posicionX , 215, 70, 70, evidencia?.path_foto, 'NONE', 0 )
    posicionX = posicionX + 90
  })

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

export const generarEvidenciasPDF = (evidencias) =>{

  console.log(evidencias)
  const doc = new jsPDF();
  const areasEnBuenasCondiciones =  evidencias.filter(evidencia => evidencia.id_area == 1)
  const areasDeOportunidad =  evidencias.filter(evidencia => evidencia.id_area == 2)
  const areasParaMantenimiento =  evidencias.filter(evidencia => evidencia.id_area == 3)

  doc.addPage("a4","p")
  doc.getFontSize(26)
  doc.text(90, 20,"Evidencias 5's");
  doc.getFontSize(12)
  doc.text(20, 30,"Areas en Buen Estado");
  let posicionX = 25
  areasEnBuenasCondiciones.forEach(evidencia => {
    doc.addImage(evidencia?.path_foto,'jpg', posicionX ,35, 70, 70, "Imagen", 'NONE', 0 )
    posicionX = posicionX + 80
  })

  doc.text(20, 120,"Areas de Oportunidad");
  posicionX = 25
  areasDeOportunidad.forEach(evidencia => {
    doc.addImage(evidencia?.path_foto,'jpg', posicionX , 125, 70, 70, "Imagen", 'NONE', 0 )
    posicionX = posicionX + 80
  })

  doc.text(20, 210,"Areas para mantenimiento");
  posicionX = 25
  areasParaMantenimiento.forEach(evidencia => {
    doc.addImage(evidencia?.path_foto,'jpg', posicionX , 215, 70, 70, "Imagen", 'NONE', 0 )
    posicionX = posicionX + 80
  })

  doc.save(`evidencias_5s_.pdf`)
}



