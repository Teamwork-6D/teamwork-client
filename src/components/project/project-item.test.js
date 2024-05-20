import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ProjectItem from './project-item';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => jest.fn()),
}));

describe('ProjectItem', () => {
  const setSelectedProject = jest.fn();
  const openDeleteProjectPopup = jest.fn();
  const openEditProjectPopup = jest.fn();

  const projectMock = {
    _id: '1',
    title: 'Project X',
    members: [{}, {}, {}],
    owner: { firstName: 'John' },
  };

  const setup = () => {
    render(
      <BrowserRouter>
        <ProjectItem
          project={projectMock}
          setSelectedProject={setSelectedProject}
          openDeleteProjectPopup={openDeleteProjectPopup}
          openEditProjectPopup={openEditProjectPopup}
        />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display project details correctly', () => {
    setup();
    const titleP = screen.getByText(/Title:/i).closest('p');
    expect(within(titleP).getByText(/Project X/i)).toBeInTheDocument();
    const membersP = screen.getByText(/Members:/i).closest('p');
    expect(within(membersP).getByText('3')).toBeInTheDocument();
    const ownerP = screen.getByText(/Owner:/i).closest('p');
    expect(within(ownerP).getByText(/John/i)).toBeInTheDocument();
  });

  it('should call setSelectedProject and navigate when the open button is clicked', async () => {
    setup();
    const openButton = screen.getByText('open');
    userEvent.click(openButton);
    await waitFor(() => {
      expect(setSelectedProject).toHaveBeenCalledWith(projectMock);
    });
  });

  it('should call setSelectedProject and openEditProjectPopup when edit button is clicked', async () => {
    setup();
    const editButton = screen.getByText('edit');
    userEvent.click(editButton);
    await waitFor(() => {
      expect(setSelectedProject).toHaveBeenCalledWith(projectMock);
      expect(openEditProjectPopup).toHaveBeenCalled();
    });
  });

  it('should call setSelectedProject and openDeleteProjectPopup when delete button is clicked', async () => {
    setup();
    const deleteButton = screen.getByText('delete');
    userEvent.click(deleteButton);
    await waitFor(() => {
      expect(setSelectedProject).toHaveBeenCalledWith(projectMock);
      expect(openDeleteProjectPopup).toHaveBeenCalled();
    });
  });
});
