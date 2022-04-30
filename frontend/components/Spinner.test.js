// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from "react"
import { render, waitFor } from "@testing-library/react";
import Spinner from "./Spinner";

test('sanity', () => {

  expect(true).not.toBe(false)
})
test("spinner renders without errors", async () => {
    render(<Spinner />)
})