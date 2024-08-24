//import React, { useState, useCallback, useEffect } from 'react';
import { createContext } from "react";
import { DeviceContextType } from "./types";

// @ts-expect-error context is not async
export const DeviceContext = createContext<DeviceContextType>(null)
