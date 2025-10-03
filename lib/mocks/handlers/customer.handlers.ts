/**
 * Customer MSW handlers
 */

import { http, HttpResponse } from 'msw';
import { EntityStatus } from '../../types/common.types';
import { CreateCustomerRequest, UpdateCustomerRequest } from '../../types/customer.types';
import { CustomerDatabase } from '../database/customer.database';
import { UbigeoDatabase } from '../database/ubigeo.database';

export const customerHandlers = [
  // Get all customers
  http.get('/api/customers', async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    const customers = CustomerDatabase.getCustomers();
    return HttpResponse.json({ customers });
  }),

  // Get customer by code
  http.get('/api/customers/:code', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { code } = params;
    const customer = CustomerDatabase.findByCode(code as string);

    if (!customer) {
      return HttpResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return HttpResponse.json({ customer });
  }),

  // Create customer
  http.post('/api/customers', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Longer delay for create

    try {
      const data = (await request.json()) as CreateCustomerRequest;

      // Validate DNI uniqueness
      if (!CustomerDatabase.isDniUnique(data.dni)) {
        return HttpResponse.json({ error: 'DNI already registered' }, { status: 409 });
      }

      // Validate email uniqueness
      if (!CustomerDatabase.isEmailUnique(data.email)) {
        return HttpResponse.json({ error: 'Email already registered' }, { status: 409 });
      }

      // Validate age
      if (!CustomerDatabase.isValidAge(data.birthDate)) {
        return HttpResponse.json(
          { error: 'Customer must be at least 18 years old' },
          { status: 400 }
        );
      }

      // Validate ubigeo exists
      const ubigeo = UbigeoDatabase.findByCode(data.ubigeoCode);
      if (!ubigeo) {
        return HttpResponse.json({ error: 'Invalid ubigeo code' }, { status: 400 });
      }

      // Create customer
      const newCustomer = {
        code: CustomerDatabase.generateCustomerCode(),
        ...data,
        registrationDate: new Date().toISOString().split('T')[0],
        userCode: 'USU001', // In real app, get from auth context
        status: EntityStatus.ACTIVE,
      };

      const savedCustomer = CustomerDatabase.saveCustomer(newCustomer);
      return HttpResponse.json({ customer: savedCustomer });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
  }),

  // Update customer
  http.put('/api/customers/:code', async ({ params, request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const { code } = params;
      const data = (await request.json()) as UpdateCustomerRequest;

      const existingCustomer = CustomerDatabase.findByCode(code as string);
      if (!existingCustomer) {
        return HttpResponse.json({ error: 'Customer not found' }, { status: 404 });
      }

      // Validate email uniqueness if email is being updated
      if (data.email && !CustomerDatabase.isEmailUnique(data.email, code as string)) {
        return HttpResponse.json({ error: 'Email already registered' }, { status: 409 });
      }

      const updatedCustomer = CustomerDatabase.updateCustomer(code as string, data);
      if (!updatedCustomer) {
        return HttpResponse.json({ error: 'Failed to update customer' }, { status: 500 });
      }

      return HttpResponse.json({ customer: updatedCustomer });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
  }),

  // Delete customer
  http.delete('/api/customers/:code', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { code } = params;
    const success = CustomerDatabase.deleteCustomer(code as string);

    if (!success) {
      return HttpResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return HttpResponse.json({ success: true });
  }),

  // Search customers
  http.get('/api/customers/search', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    const allCustomers = CustomerDatabase.getCustomers();
    const filteredCustomers = allCustomers.filter((customer) => {
      const searchableText =
        `${customer.firstName} ${customer.lastName} ${customer.dni} ${customer.email}`.toLowerCase();
      return searchableText.includes(query);
    });

    return HttpResponse.json({ customers: filteredCustomers });
  }),
];

// Ubigeo handlers
export const ubigeoHandlers = [
  // Get all ubigeos
  http.get('/api/ubigeo', async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const ubigeos = UbigeoDatabase.getUbigeos();
    return HttpResponse.json({ ubigeos });
  }),

  // Get departments
  http.get('/api/ubigeo/departments', async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const departments = UbigeoDatabase.getDepartments();
    return HttpResponse.json({ departments });
  }),

  // Get provinces
  http.get('/api/ubigeo/provinces', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const url = new URL(request.url);
    const department = url.searchParams.get('department');

    if (!department) {
      return HttpResponse.json({ error: 'Department parameter is required' }, { status: 400 });
    }

    const provinces = UbigeoDatabase.getProvincesByDepartment(department);
    return HttpResponse.json({ provinces });
  }),

  // Get districts
  http.get('/api/ubigeo/districts', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const url = new URL(request.url);
    const department = url.searchParams.get('department');
    const province = url.searchParams.get('province');

    if (!department || !province) {
      return HttpResponse.json(
        { error: 'Department and province parameters are required' },
        { status: 400 }
      );
    }

    const districts = UbigeoDatabase.getDistrictsByDepartmentAndProvince(department, province);
    return HttpResponse.json({ districts });
  }),

  // Get ubigeo by code
  http.get('/api/ubigeo/:code', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const { code } = params;
    const ubigeo = UbigeoDatabase.findByCode(code as string);

    if (!ubigeo) {
      return HttpResponse.json({ error: 'Ubigeo not found' }, { status: 404 });
    }

    return HttpResponse.json({ ubigeo });
  }),
];
