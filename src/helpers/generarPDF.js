import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generarPDF = (empresa, departamento, fecha, calificacion, lista_s, evaluacion, evidencias) =>{
  const doc = new jsPDF();
  console.log("Generando Reporte")

  // HAY QUE SUBIR LA IMAGEN DEL LOGO AL SERVIDOR Y PONER LA URL DE LA IMAGEN AQUI
  doc.addImage("https://backend.gruver.com.mx/img-1664300003221.png",'png', 160, 5, 25, 25,"logo5s", 'NONE', 0 )

  doc.autoTable({
    theme: 'plain',
    styles: { halign: 'center',  fontSize: 12 } ,
    columns :
    [{header: "",  dataKey: 'empresa' },
     {header: "Evaluación 5'S",  dataKey: 'departamento' },
     {header: "",  dataKey: 'fecha' }],
  })

  doc.autoTable({
    theme: 'plain',
    styles: { halign: 'center',  fontSize: 10  },
    margin : {top: 0, bottom: 0},
    border : {top: 0, right: 0, bottom: 0, left: 0},
    cellPadding: {top: 1, right: 1, bottom: 1, left: 1},
    columns :
    [{header: "",  dataKey: 'empresa' },
     {header: "",  dataKey: 'departamento' },
     {header: "",  dataKey: 'fecha' }],
    body: [
      { empresa: `Empresa: ${empresa}`, departamento: `Departamento: ${departamento}`, fecha: `Fecha: ${fecha}` },
      { empresa: ``, departamento: ``, fecha: `Calificación final: ${calificacion}` }
    ],
  })

  let numeroDeS = 1

  lista_s.forEach(s => {
    doc.autoTable({
      theme: 'plain',
      styles: { halign: 'center',  fontSize: 10,},
      border : {top: 0, right: 0, bottom: 0, left: 0},
      cellPadding: {top: 0, right: 0, bottom: 0, left: 0},
      body: [
        { nombre_s: ` ${numeroDeS}S.${s.nombre.toUpperCase() }`},
      ],
      columnStyles: { 0: {  fontSize: 10, fontStyle: 'bold'}}
    })

    numeroDeS = numeroDeS + 1

    doc.autoTable({
      styles: { fontSize: 9},
      border : {top: 0, right: 0, bottom: 0, left: 0},
      cellPadding: {top: 1, right: 1, bottom: 1, left: 1},
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

  const areasEnBuenasCondiciones =  evidencias.filter(evidencia => evidencia.id_area === 1)
  const areasDeOportunidad =  evidencias.filter(evidencia => evidencia.id_area === 2)
  const areasParaMantenimiento =  evidencias.filter(evidencia => evidencia.id_area === 3)

  let indexPosicion =  0
  const posiciones = [
    { x:30, y:30 }, { x:105, y:30 },
    { x:30, y:115 }, { x:105, y:115 },
    { x:30, y:200 }, { x:105, y:200 } ]

  const nuevaPaginaEvidencias = area => {
      doc.addPage("a4","p")
      doc.getFontSize(26)
      doc.text(90, 20,"Evidencias 5's");
      doc.addImage("https://backend.gruver.com.mx/img-1664300003221.png",'png', 160, 5, 25, 25,"logo5s", 'NONE', 0 )
      doc.getFontSize(8)
      doc.text(20, 27,area);
      indexPosicion = 0
  }

  if(areasEnBuenasCondiciones.length > 0){
    nuevaPaginaEvidencias("Areas en Buenas Condiciones")
    areasEnBuenasCondiciones.forEach(evidencia => {
      doc.addImage(evidencia?.path_foto,'jpg', posiciones[indexPosicion].x , posiciones[indexPosicion].y, 70, 80, evidencia?.path_foto, 'NONE', 0 )
      indexPosicion == 5 ? nuevaPaginaEvidencias("Areas en Buenas Condiciones"):
      indexPosicion < 5? indexPosicion++ : indexPosicion = 0
    })
  }

  if(areasDeOportunidad.length > 0){
    nuevaPaginaEvidencias("Areas de Oportunidad")
    areasDeOportunidad.forEach(evidencia => {
      doc.addImage(evidencia?.path_foto,'jpg', posiciones[indexPosicion].x , posiciones[indexPosicion].y, 70, 80, evidencia?.path_foto, 'NONE', 0 )
      indexPosicion == 5 ? nuevaPaginaEvidencias("Areas de Oportunidad"):
      indexPosicion < 5? indexPosicion++ : indexPosicion = 0
    })
  }

  if(areasParaMantenimiento.length > 0){
    nuevaPaginaEvidencias("Areas para Mantenimiento")
    areasParaMantenimiento.forEach(evidencia => {
      doc.addImage(evidencia?.path_foto,'jpg', posiciones[indexPosicion].x , posiciones[indexPosicion].y, 70, 80, evidencia?.path_foto, 'NONE', 0 )
      indexPosicion == 5 ? nuevaPaginaEvidencias("Areas para Mantenimiento"):
      indexPosicion < 5? indexPosicion++ : indexPosicion = 0
    })
  }


  doc.save(`evaluacion_5s_${empresa}_${departamento}_${fecha}.pdf`)

}





