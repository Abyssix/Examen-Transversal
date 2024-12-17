export interface Asistencia {
  uid: string;
  asignatura: string;
  hora: string;
  fecha: string;
  qrCodeUrl: string; // URL del código QR generado
  usuarios: string[]; // Lista de IDs de usuarios que asistieron
  creadorNombre: string; // Nombre del creador de la asistencia
}

  