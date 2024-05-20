import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateProjectPopup, DeleteProjectPopup, EditProjectPopup } from './popups';
import { app } from '../../constants';

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const mockCloseModal = jest.fn();
const mockGetAllProjects = jest.fn();

describe('CreateProjectPopup', () => {
  test('should allow users to input project name and submit', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    render(<CreateProjectPopup closeModal={mockCloseModal} getAllProjects={mockGetAllProjects} />);

    fireEvent.change(screen.getByPlaceholderText('enter project name'), {
      target: { value: 'New Project' }
    });

    fireEvent.click(screen.getByText('submit'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(`${app.server_url}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer undefined', 
      },
      body: JSON.stringify({ title: 'New Project' }),
    }));

    expect(mockGetAllProjects).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

describe('DeleteProjectPopup', () => {
  test('should confirm deletion of a project', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    const project = { _id: '123', title: 'Test Project' };
    render(<DeleteProjectPopup project={project} closeModal={mockCloseModal} getAllProjects={mockGetAllProjects} />);

    fireEvent.click(screen.getByText('yes'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(`${app.server_url}/projects/${project._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer undefined',  
      },
    }));

    expect(mockGetAllProjects).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

describe('EditProjectPopup', () => {
  test('should allow users to edit project name and save changes', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    const project = { _id: '123', title: 'Old Project' };
    render(<EditProjectPopup project={project} closeModal={mockCloseModal} getAllProjects={mockGetAllProjects} />);

    fireEvent.change(screen.getByPlaceholderText('enter project name'), {
      target: { value: 'Updated Project' }
    });

    fireEvent.click(screen.getByText('save'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(`${app.server_url}/projects/${project._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer undefined',  
      },
      body: JSON.stringify({ title: 'Updated Project' }),
    }));

    expect(mockGetAllProjects).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
