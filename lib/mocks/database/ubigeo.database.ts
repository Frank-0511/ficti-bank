/**
 * Ubigeo database mock operations
 */

import { Ubigeo } from '../../types/customer.types';

export class UbigeoDatabase {
  private static UBIGEO_KEY = 'T_Ubigeo';

  static getUbigeos(): Ubigeo[] {
    try {
      const stored = localStorage.getItem(this.UBIGEO_KEY);
      if (stored) {
        return JSON.parse(stored);
      }

      // Initialize with seed data if empty
      const seedData = this.getSeedData();
      this.saveUbigeos(seedData);
      return seedData;
    } catch {
      return this.getSeedData();
    }
  }

  static saveUbigeos(ubigeos: Ubigeo[]): void {
    localStorage.setItem(this.UBIGEO_KEY, JSON.stringify(ubigeos));
  }

  static getDepartments(): string[] {
    const ubigeos = this.getUbigeos();
    const departments = Array.from(new Set(ubigeos.map((u) => u.department)));
    return departments.sort();
  }

  static getProvincesByDepartment(department: string): string[] {
    const ubigeos = this.getUbigeos();
    const provinces = Array.from(
      new Set(ubigeos.filter((u) => u.department === department).map((u) => u.province))
    );
    return provinces.sort();
  }

  static getDistrictsByDepartmentAndProvince(department: string, province: string): string[] {
    const ubigeos = this.getUbigeos();
    const districts = ubigeos
      .filter((u) => u.department === department && u.province === province)
      .map((u) => u.district)
      .sort();
    return districts;
  }

  static findByCode(code: string): Ubigeo | null {
    return this.getUbigeos().find((u) => u.code === code) || null;
  }

  static findByLocation(department: string, province: string, district: string): Ubigeo | null {
    return (
      this.getUbigeos().find(
        (u) => u.department === department && u.province === province && u.district === district
      ) || null
    );
  }

  private static getSeedData(): Ubigeo[] {
    return [
      // Lima
      { code: '150101', department: 'Lima', province: 'Lima', district: 'Lima' },
      { code: '150102', department: 'Lima', province: 'Lima', district: 'Ancón' },
      { code: '150103', department: 'Lima', province: 'Lima', district: 'Ate' },
      { code: '150104', department: 'Lima', province: 'Lima', district: 'Barranco' },
      { code: '150105', department: 'Lima', province: 'Lima', district: 'Breña' },
      { code: '150106', department: 'Lima', province: 'Lima', district: 'Carabayllo' },
      { code: '150107', department: 'Lima', province: 'Lima', district: 'Chaclacayo' },
      { code: '150108', department: 'Lima', province: 'Lima', district: 'Chorrillos' },
      { code: '150109', department: 'Lima', province: 'Lima', district: 'Cieneguilla' },
      { code: '150110', department: 'Lima', province: 'Lima', district: 'Comas' },
      { code: '150111', department: 'Lima', province: 'Lima', district: 'El Agustino' },
      { code: '150112', department: 'Lima', province: 'Lima', district: 'Independencia' },
      { code: '150113', department: 'Lima', province: 'Lima', district: 'Jesús María' },
      { code: '150114', department: 'Lima', province: 'Lima', district: 'La Molina' },
      { code: '150115', department: 'Lima', province: 'Lima', district: 'La Victoria' },
      { code: '150116', department: 'Lima', province: 'Lima', district: 'Lince' },
      { code: '150117', department: 'Lima', province: 'Lima', district: 'Los Olivos' },
      { code: '150118', department: 'Lima', province: 'Lima', district: 'Lurigancho' },
      { code: '150119', department: 'Lima', province: 'Lima', district: 'Lurin' },
      { code: '150120', department: 'Lima', province: 'Lima', district: 'Magdalena del Mar' },
      { code: '150121', department: 'Lima', province: 'Lima', district: 'Miraflores' },
      { code: '150122', department: 'Lima', province: 'Lima', district: 'Pachacamac' },
      { code: '150123', department: 'Lima', province: 'Lima', district: 'Pucusana' },
      { code: '150124', department: 'Lima', province: 'Lima', district: 'Pueblo Libre' },
      { code: '150125', department: 'Lima', province: 'Lima', district: 'Puente Piedra' },
      { code: '150126', department: 'Lima', province: 'Lima', district: 'Punta Hermosa' },
      { code: '150127', department: 'Lima', province: 'Lima', district: 'Punta Negra' },
      { code: '150128', department: 'Lima', province: 'Lima', district: 'Rímac' },
      { code: '150129', department: 'Lima', province: 'Lima', district: 'San Bartolo' },
      { code: '150130', department: 'Lima', province: 'Lima', district: 'San Borja' },
      { code: '150131', department: 'Lima', province: 'Lima', district: 'San Isidro' },
      { code: '150132', department: 'Lima', province: 'Lima', district: 'San Juan de Lurigancho' },
      { code: '150133', department: 'Lima', province: 'Lima', district: 'San Juan de Miraflores' },
      { code: '150134', department: 'Lima', province: 'Lima', district: 'San Luis' },
      { code: '150135', department: 'Lima', province: 'Lima', district: 'San Martín de Porres' },
      { code: '150136', department: 'Lima', province: 'Lima', district: 'San Miguel' },
      { code: '150137', department: 'Lima', province: 'Lima', district: 'Santa Anita' },
      { code: '150138', department: 'Lima', province: 'Lima', district: 'Santa María del Mar' },
      { code: '150139', department: 'Lima', province: 'Lima', district: 'Santa Rosa' },
      { code: '150140', department: 'Lima', province: 'Lima', district: 'Santiago de Surco' },
      { code: '150141', department: 'Lima', province: 'Lima', district: 'Surquillo' },
      { code: '150142', department: 'Lima', province: 'Lima', district: 'Villa El Salvador' },
      { code: '150143', department: 'Lima', province: 'Lima', district: 'Villa María del Triunfo' },

      // Callao
      { code: '070101', department: 'Callao', province: 'Callao', district: 'Callao' },
      { code: '070102', department: 'Callao', province: 'Callao', district: 'Bellavista' },
      {
        code: '070103',
        department: 'Callao',
        province: 'Callao',
        district: 'Carmen de la Legua Reynoso',
      },
      { code: '070104', department: 'Callao', province: 'Callao', district: 'La Perla' },
      { code: '070105', department: 'Callao', province: 'Callao', district: 'La Punta' },
      { code: '070106', department: 'Callao', province: 'Callao', district: 'Ventanilla' },

      // Arequipa
      { code: '040101', department: 'Arequipa', province: 'Arequipa', district: 'Arequipa' },
      {
        code: '040102',
        department: 'Arequipa',
        province: 'Arequipa',
        district: 'Alto Selva Alegre',
      },
      { code: '040103', department: 'Arequipa', province: 'Arequipa', district: 'Cayma' },
      { code: '040104', department: 'Arequipa', province: 'Arequipa', district: 'Cerro Colorado' },
      { code: '040105', department: 'Arequipa', province: 'Arequipa', district: 'Characato' },
      { code: '040106', department: 'Arequipa', province: 'Arequipa', district: 'Chiguata' },
      { code: '040107', department: 'Arequipa', province: 'Arequipa', district: 'Jacobo Hunter' },
      { code: '040108', department: 'Arequipa', province: 'Arequipa', district: 'La Joya' },
      { code: '040109', department: 'Arequipa', province: 'Arequipa', district: 'Mariano Melgar' },
      { code: '040110', department: 'Arequipa', province: 'Arequipa', district: 'Miraflores' },
      { code: '040111', department: 'Arequipa', province: 'Arequipa', district: 'Mollebaya' },
      { code: '040112', department: 'Arequipa', province: 'Arequipa', district: 'Paucarpata' },
      { code: '040113', department: 'Arequipa', province: 'Arequipa', district: 'Pocsi' },
      { code: '040114', department: 'Arequipa', province: 'Arequipa', district: 'Polobaya' },
      { code: '040115', department: 'Arequipa', province: 'Arequipa', district: 'Quequeña' },
      { code: '040116', department: 'Arequipa', province: 'Arequipa', district: 'Sabandia' },
      { code: '040117', department: 'Arequipa', province: 'Arequipa', district: 'Sachaca' },
      {
        code: '040118',
        department: 'Arequipa',
        province: 'Arequipa',
        district: 'San Juan de Siguas',
      },
      {
        code: '040119',
        department: 'Arequipa',
        province: 'Arequipa',
        district: 'San Juan de Tarucani',
      },
      {
        code: '040120',
        department: 'Arequipa',
        province: 'Arequipa',
        district: 'Santa Isabel de Siguas',
      },
      {
        code: '040121',
        department: 'Arequipa',
        province: 'Arequipa',
        district: 'Santa Rita de Siguas',
      },
      { code: '040122', department: 'Arequipa', province: 'Arequipa', district: 'Socabaya' },
      { code: '040123', department: 'Arequipa', province: 'Arequipa', district: 'Tiabaya' },
      { code: '040124', department: 'Arequipa', province: 'Arequipa', district: 'Uchumayo' },
      { code: '040125', department: 'Arequipa', province: 'Arequipa', district: 'Vitor' },
      { code: '040126', department: 'Arequipa', province: 'Arequipa', district: 'Yanahuara' },
      { code: '040127', department: 'Arequipa', province: 'Arequipa', district: 'Yarabamba' },
      { code: '040128', department: 'Arequipa', province: 'Arequipa', district: 'Yura' },
    ];
  }
}
