import { StylesConfig } from "react-select";
export const Complete: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: 0,
    minHeight: "fit-fit-content",
    boxShadow: 0,
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.value ? "#84cc16" : "#f59e0b";
    return {
      ...styles,
      backgroundColor: color,
      padding: 0,
      textAlign: "center",
      opacity: 0.7,
      ":hover": {
        ...styles[":hover"],
        backgroundColor: color,
        opacity: 1,
      },
      cursor: "pointer",
      ":active": {
        ...styles[":active"],
        backgroundColor: color,
        opacity: 1,
      },
    };
  },
  // input: (styles) => ({ ...styles, ...dot() }),
  // placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({
    ...styles,
    margin: 0,
    padding: 4,
    backgroundColor: data.value ? "#84cc16" : "#f59e0b",
    color: "white",
    letterSpacing: 1,
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    display: "none",
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  menu: (styles) => ({ ...styles, marginTop: 1 }),
  menuList: (styles) => ({ ...styles, padding: 0 }),
  container: (styles) => ({ ...styles, padding: 0 }),
};

export const CreatableSelect = (color) => {
  const Categogories = {
    control: (styles, { hasValue, isMulti }) => {
      return {
        ...styles,
        minHeight: "fit-content",
        minWidth: hasValue ? "fit-content" : 240,
        maxWidth: "fit-content",
        boxShadow: 0,
        ...(hasValue
          ? isMulti && {
              paddingLeft: 10,
              paddingRight: 30,
              paddingTop: 5,
              paddingBottom: 5,
            }
          : {
              paddingLeft: 10,
              paddingRight: 30,
              paddingTop: 5,
              paddingBottom: 5,
            }),
        backgroundColor: "transparent",
        borderRadius: 10,
        borderColor: `rgba(${color},0.5)`,
        ":hover": {
          ...styles[":hover"],

          borderColor: `rgba(${color},1)`,
        },
      };
    },

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        display: isSelected && "none",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: `rgba(${color},0.7)`,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
        textAlign: "center",
        opacity: 0.7,
        width: "fit-content",
        color: `rgba(${color},0.8)`,
        borderRadius: 2,
        ":hover": {
          ...styles[":hover"],

          opacity: 1,
        },
        cursor: "pointer",
        ":active": {
          ...styles[":active"],
          background: `rgba(${color},0.8)`,
          color: "white",
          opacity: 0.8,
          borderColor: `rgba(${color},0.8)`,
        },
      };
    },
    input: (styles) => ({
      ...styles,
      color: `rgba(${color},0.8)`,
      fontSize: 15,
      fontWeight: "bold",
      textTransform: "capitalize",
    }),
    placeholder: (styles) => ({ ...styles, color: `rgba(${color},1)` }),

    indicatorsContainer: (styles) => ({
      ...styles,
      display: "none",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
    }),
    menu: (styles, { isMulti, hasValue }) => ({
      ...styles,
      marginTop: 1,
      backgroundColor: "rgba(0, 0, 0,0.8)",
      ...(hasValue
        ? isMulti && {
            paddingLeft: 10,
            paddingRight: 20,
            paddingTop: 5,
            paddingBottom: 5,
          }
        : {
            paddingLeft: 10,
            paddingRight: 20,
            paddingTop: 5,
            paddingBottom: 5,
          }),
    }),

    singleValue: (styles, { data }) => ({
      ...styles,
      margin: 0,
      padding: 4,
      backgroundColor: `rgba(${color},0.8)`,
      color: "white",
      letterSpacing: 1,
      borderRadius: 2,
      width: "fit-content",
    }),

    menuList: (styles) => ({
      ...styles,
      padding: 0,
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    }),
    container: (styles) => ({ ...styles, padding: 0 }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: `rgba(${color},0.6)`,
      borderRadius: 2,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: `rgba(${color},0.8)`,
      letterSpacing: 0.8,
      fontWeight: "bold",
    }),
    multiValueRemove: (styles) => ({ ...styles, color: `rgba(${color},0.8)` }),
  };
  return Categogories;
};
