/** @format */

import { render, screen } from "@testing-library/react";
import App from "./App";
import { server } from "./mocks/server";
import { rest } from "msw";

describe("App", () => {
  test("renders a user list", async () => {
    render(<App />);
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(users.length);
  });

  test("renders error while fetching charatcer", async () => {
    server.use(
      rest.get("https://rickandmortyapi.com/api/character", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<App />);
    const error = await screen.findByText(/Error Fetchning users/i);
    expect(error).toBeInTheDocument();
  });

  test("renders error while fetching episode", async () => {
    server.use(
      rest.get("https://rickandmortyapi.com/api/episode", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<App />);
    const error = await screen.findByText(/Error Fetchning episode/i);
    expect(error).toBeInTheDocument();
  });

  test("renders input filed correctly", () => {
    render(<App />);
    const textElement = screen.getByRole("textbox");
    expect(textElement).toBeInTheDocument();
  });

  test("previous btn render correctly", () => {
    render(<App />);
    const btnText = screen.getByRole("button", { name: /previous/i });
    expect(btnText).toBeInTheDocument();
  });

  test("next btn render correctly", () => {
    render(<App />);
    const btnText = screen.getByRole("button", { name: /next/i });
    expect(btnText).toBeInTheDocument();
  });
});
