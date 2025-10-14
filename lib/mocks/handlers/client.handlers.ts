import { http, HttpResponse } from 'msw';
import { ENTITY_STATUS } from '@/lib/constants';
import { ApiResponse, Client } from '@/lib/types';
import { CLIENTS_STORAGE_KEY, DEFAULT_CLIENTS } from '../data/clients.data';

// Helper para obtener clientes del localStorage o usar defaults
const getClients = (): Client[] => {
  if (typeof window === 'undefined') {
    return DEFAULT_CLIENTS;
  }
  const stored = localStorage.getItem(CLIENTS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_CLIENTS;
};

// Helper para guardar clientes en localStorage
const saveClients = (clients: Client[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
  }
};

export const clientHandlers = [
  // GET /api/clients - Obtener todos los clientes
  http.get('/api/clients', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const personType = url.searchParams.get('personType');

    let clients = getClients();

    // Filtrar por estado si se proporciona
    if (status) {
      clients = clients.filter((client) => client.status === status);
    }

    // Filtrar por tipo de persona si se proporciona
    if (personType) {
      clients = clients.filter((client) => client.personType === personType);
    }

    const response: ApiResponse<Client[]> = {
      success: true,
      message: 'Clientes obtenidos exitosamente',
      data: clients,
    };

    return HttpResponse.json(response);
  }),

  // GET /api/clients/:id - Obtener un cliente por ID
  http.get('/api/clients/:id', ({ params }) => {
    const { id } = params;
    const clients = getClients();
    const client = clients.find((c) => c.id === id);

    if (!client) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Cliente no encontrado',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Client> = {
      success: true,
      message: 'Cliente obtenido exitosamente',
      data: client,
    };

    return HttpResponse.json(response);
  }),

  // POST /api/clients - Crear un nuevo cliente
  http.post('/api/clients', async ({ request }) => {
    const body = (await request.json()) as Partial<Client>;
    const clients = getClients();

    // Generar código único
    const nextNumber = clients.length + 1;
    const code = `CLI${String(nextNumber).padStart(3, '0')}`;

    const newClient: Client = {
      id: String(Date.now()),
      code,
      personType: body.personType || 'N',
      firstName: body.firstName,
      lastName: body.lastName,
      dni: body.dni,
      birthDate: body.birthDate,
      businessName: body.businessName,
      ruc: body.ruc,
      legalRepresentative: body.legalRepresentative,
      email: body.email || '',
      phone: body.phone || '',
      address: body.address || '',
      district: body.district || '',
      province: body.province || '',
      department: body.department || '',
      status: ENTITY_STATUS.ACTIVE,
      registeredAt: new Date().toISOString(),
      registeredBy: '1', // TODO: Obtener del usuario autenticado
    };

    clients.push(newClient);
    saveClients(clients);

    const response: ApiResponse<Client> = {
      success: true,
      message: 'Cliente registrado exitosamente',
      data: newClient,
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  // PUT /api/clients/:id - Actualizar un cliente
  http.put('/api/clients/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Partial<Client>;
    const clients = getClients();
    const clientIndex = clients.findIndex((c) => c.id === id);

    if (clientIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Cliente no encontrado',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }

    const updatedClient = {
      ...clients[clientIndex],
      ...body,
      id: clients[clientIndex].id, // Mantener el ID original
      code: clients[clientIndex].code, // Mantener el código original
    };

    clients[clientIndex] = updatedClient;
    saveClients(clients);

    const response: ApiResponse<Client> = {
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: updatedClient,
    };

    return HttpResponse.json(response);
  }),

  // DELETE /api/clients/:id - Eliminar (desactivar) un cliente
  http.delete('/api/clients/:id', ({ params }) => {
    const { id } = params;
    const clients = getClients();
    const clientIndex = clients.findIndex((c) => c.id === id);

    if (clientIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Cliente no encontrado',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }

    // En lugar de eliminar, desactivar
    clients[clientIndex].status = ENTITY_STATUS.INACTIVE;
    saveClients(clients);

    const response: ApiResponse<null> = {
      success: true,
      message: 'Cliente desactivado exitosamente',
      data: null,
    };

    return HttpResponse.json(response);
  }),
];
