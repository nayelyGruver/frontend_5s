import dayjs from 'dayjs'
import { es } from 'dayjs/locale/es'

export const formatearFecha = ( stringFecha ) =>  dayjs( stringFecha ).locale("es").format("DD/MMMM/YYYY")

export const formatearFecha2 = ( stringFecha ) =>  dayjs( stringFecha ).locale("es").format("YYYY/MM/DD")
