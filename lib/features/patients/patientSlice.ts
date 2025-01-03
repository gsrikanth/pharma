import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction, current } from "@reduxjs/toolkit";
import { PatientType } from "@/lib/schemas/patientSchema";

export interface PatientsSliceState {
  data: PatientType[];
  filteredData: PatientType[];
  filterText: string;
}

const initialState: PatientsSliceState = {
  data: [],
  filteredData: [],
  filterText: "",
};

const saveToLocalStorage = (state: PatientsSliceState) => {
  if (localForage) {
    localForage.setItem("patients", current(state.data));
  }
};

var localForage: LocalForage | null = null;
// If you are not using async thunks you can use the standalone `createSlice`.
export const patientSlice = createAppSlice({
  name: "patients",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Use the `preparedReducer` utility to create a reducer that can be used with
    // the `prepare` method to pass extra data to the reducer
    addPatient: create.preparedReducer(
      (patient: PatientType, extraData: any) => {
        localForage = extraData;
        return { payload: patient, extraData };
      },
      (state: PatientsSliceState, action: PayloadAction<PatientType>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.data.push(action.payload);
        action.payload?.name
          .toLowerCase()
          .includes(state.filterText.toLowerCase()) &&
          state.filteredData.push(action.payload);
        saveToLocalStorage(state);
      }
    ),
    editPatient: create.preparedReducer(
      (patient: PatientType, extraData: any) => {
        localForage = extraData;
        return { payload: patient, extraData };
      },
      (state, action: PayloadAction<PatientType>) => {
        let index = state.data.findIndex(
          (patient: PatientType) => patient?.id === action.payload?.id
        );
        if (index !== -1) {
          state.data.splice(index, 1, action.payload);
          saveToLocalStorage(state);
        }
        index = state.filteredData.findIndex(
          (patient: PatientType) => patient?.id === action.payload?.id
        );
        if (index !== -1) {
          state.filteredData.splice(index, 1, action.payload);
          saveToLocalStorage(state);
        }
      }
    ),
    deletePatient: create.preparedReducer(
      (patient: PatientType, extraData: any) => {
        localForage = extraData;
        return { payload: patient, extraData };
      },
      (state, action: PayloadAction<PatientType>) => {
        let index = state.data.findIndex(
          (patient: PatientType) => patient?.id === action.payload?.id
        );
        if (index !== -1) {
          state.data.splice(index, 1);
          saveToLocalStorage(state);
        }
        index = state.filteredData.findIndex(
          (patient: PatientType) => patient?.id === action.payload?.id
        );
        if (index !== -1) {
          state.filteredData.splice(index, 1);
          saveToLocalStorage(state);
        }
      }
    ),
    loadPatients: create.reducer(
      (state: PatientsSliceState, action: PayloadAction<PatientType[]>) => {
        state.data = action.payload;
        state.filteredData = action.payload;
      }
    ),
    filterPatients: create.reducer(
      (state: PatientsSliceState, action: PayloadAction<string>) => {
        const filterText = action.payload;
        const filterPatients = state.data.filter((patient) =>
          patient?.name.toLowerCase().includes(filterText.toLowerCase())
        );
        state.filterText = filterText;
        state.filteredData = !filterText ? state.data : filterPatients;
      }
    ),
  }),
});

// Action creators are generated for each case reducer function.
export const {
  addPatient,
  editPatient,
  deletePatient,
  loadPatients,
  filterPatients,
} = patientSlice.actions;
