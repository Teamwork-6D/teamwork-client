import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ProjectList from './project-list';  

jest.mock('./project-item', () => {
    return ({ project }) => <div data-testid="project-item">{project.title}</div>;
});

describe('ProjectList', () => {
    const mockProjects = [
        { _id: '1', title: 'Project One' },
        { _id: '2', title: 'Project Two' },
        { _id: '3', title: 'Project Three' }
    ];
    const mockOpenCreateProjectPopup = jest.fn();

    beforeEach(() => {
        render(
            <ProjectList
                projects={mockProjects}
                openCreateProjectPopup={mockOpenCreateProjectPopup}
                setSelectedProject={() => {}}
                openDeleteProjectPopup={() => {}}
                openEditProjectPopup={() => {}}
            />
        );
    });

    it('renders the correct number of projects', () => {
        const projectItems = screen.getAllByTestId('project-item');
        expect(projectItems.length).toBe(3);
        expect(projectItems[0]).toHaveTextContent('Project One');
        expect(projectItems[1]).toHaveTextContent('Project Two');
        expect(projectItems[2]).toHaveTextContent('Project Three');
    });

    it('calls openCreateProjectPopup when the create project button is clicked', async () => {
        const createProjectBtn = screen.getByRole('button', { name: /create project/i });
        userEvent.click(createProjectBtn);
        await waitFor(() => {
            expect(mockOpenCreateProjectPopup).toHaveBeenCalledTimes(1);
        });
    });
    
});
