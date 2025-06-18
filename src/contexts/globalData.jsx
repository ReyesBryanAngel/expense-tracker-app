import React, { createContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

export const GlobalDataContext = createContext()

export const GlobalDataProvider = ({ children }) => {
    const [form, setForm] = useState({
      amount: "",
      category: "",
      type: "",
      description: "",
      date: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
  
 


  const contextValue = useMemo(
    () => ({
      form,
      setForm,
      isEditMode,
      setIsEditMode
    }),
    [form, setForm, isEditMode, setIsEditMode],
  )

  return <GlobalDataContext.Provider value={contextValue}>{children}</GlobalDataContext.Provider>
}

GlobalDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
