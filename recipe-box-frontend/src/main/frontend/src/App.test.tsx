import { render, screen } from "@testing-library/react";
import App from "./App";
import {RouterProvider} from "react-router-dom";
import React from "react";

test("renders learn react link", () => {
    render(   <RouterProvider router={App()} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
