import { useReducer, useEffect } from "react";
import type { State, Action, FormData, FormErrors } from "../types";
import { ActionType, OrderOptionValue, TypeOptionValue } from "../types";
import { computeErrors } from "../helpers";

const initialState: State = {
  form: {
    label: "",
    defaultValue: "",
    choices: "",
    required: false,
    order: OrderOptionValue.ASC,
    type: TypeOptionValue.SINGLE,
  },
  errors: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, form: { ...state.form, ...action.payload } };
    case ActionType.RESET:
      return initialState;
    case ActionType.VALIDATE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}

export function useFormReducer(key = "fieldForm") {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (init: State): State => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<FormData>;
          return {
            form: { ...init.form, ...parsed },
            errors: {},
          };
        }
      } catch (e) {
        console.warn("Invalid saved form:", e);
      }
      return init;
    }
  );

  useEffect(() => {
    const serialized = JSON.stringify(state.form);
    localStorage.setItem(key, serialized);
  }, [key, state.form]);

  const updateForm = (payload: Partial<FormData>) =>
    dispatch({ type: ActionType.UPDATE, payload });

  const resetForm = () => {
    localStorage.removeItem(key);
    dispatch({ type: ActionType.RESET });
  };

  const validateForm = () => {
    const errors: FormErrors = computeErrors(state.form);
    dispatch({ type: ActionType.VALIDATE, payload: errors });
    return errors;
  };

  return { form: state.form, errors: state.errors, updateForm, resetForm, validateForm };
}
