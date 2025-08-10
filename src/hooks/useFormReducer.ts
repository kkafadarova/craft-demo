import { useReducer, useEffect } from "react";
import type { State, Action, FormData, FormErrors } from "../types";
import { ActionType } from "../types";
import { computeErrors } from "../helpers";

const initialState: State = {
  form: {
    label: "",
    defaultValue: "",
    choices: "",
    required: false,
    order: "asc",
    type: "",
  },
  errors: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.UPDATE:
      return {
        ...state,
        form: { ...state.form, ...action.payload },
      };

    case ActionType.RESET:
      return initialState;

    case ActionType.VALIDATE:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
}

export function useFormReducer(key = "fieldForm") {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: ActionType.UPDATE, payload: parsed });
      } catch (e) {
        console.error("Invalid saved form:", e);
      }
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state.form));
  }, [state.form, key]);

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

  return {
    form: state.form,
    errors: state.errors,
    updateForm,
    resetForm,
    validateForm,
  };
}
