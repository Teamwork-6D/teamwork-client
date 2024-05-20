import React from "react";
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectPage from "./index";

jest.mock("../../components/project/project-list", () => (props) => (
  <div>
    <button onClick={props.openCreateProjectPopup}>Create Project</button>
    <button onClick={props.openDeleteProjectPopup}>Delete Project</button>
    <button onClick={props.openEditProjectPopup}>Edit Project</button>
  </div>
));
jest.mock("../../components/project/popups", () => ({
  CreateProjectPopup: ({ closeModal }) => (
    <div role="dialog">CreateProjectPopup <button onClick={closeModal}>Close</button></div>
  ),
  DeleteProjectPopup: ({ closeModal }) => (
    <div role="dialog">DeleteProjectPopup <button onClick={closeModal}>Close</button></div>
  ),
  EditProjectPopup: ({ closeModal }) => (
    <div role="dialog">EditProjectPopup <button onClick={closeModal}>Close</button></div>
  ),
}));

describe("ProjectPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ token: "fake-token" }));
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ projects: [{ id: 1, name: "Test Project" }] }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("renders without crashing", async () => {
    await act(async () => {
      const { debug } = render(<ProjectPage />);
      debug();
    });
    expect(screen.getByText("Create Project")).toBeInTheDocument();
  });

  it("fetches projects on component mount", async () => {
    await act(async () => {
      render(<ProjectPage />);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it("opens and closes the create project popup", async () => {
    await act(async () => {
      render(<ProjectPage />);
    });
    await waitFor(() => screen.getByText((content, element) => content.includes("Create Project")));
    fireEvent.click(screen.getByText((content, element) => content.includes("Create Project")));
    expect(screen.getByRole("dialog")).toHaveTextContent("CreateProjectPopup");

    await waitFor(() => screen.getByText("Close"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("handles delete and edit popups similarly", async () => {
    await act(async () => {
      render(<ProjectPage />);
    });
    await waitFor(() => screen.getByText((content, element) => content.includes("Delete Project")));
    fireEvent.click(screen.getByText((content, element) => content.includes("Delete Project")));
    expect(screen.getByRole("dialog")).toHaveTextContent("DeleteProjectPopup");
    
    await waitFor(() => screen.getByText((content, element) => content.includes("Edit Project")));
    fireEvent.click(screen.getByText((content, element) => content.includes("Edit Project")));
    expect(screen.getByRole("dialog")).toHaveTextContent("EditProjectPopup");
  });
});
