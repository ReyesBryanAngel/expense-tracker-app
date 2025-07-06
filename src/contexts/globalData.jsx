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
  const [profileInfo, setProfileInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    isVerified: ""
  })
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);




  const contextValue = useMemo(
    () => ({
      form,
      setForm,
      isEditMode,
      setIsEditMode,
      isProfileModalOpen,
      setIsProfileModalOpen,
      profileInfo,
      setProfileInfo,
      isTransactionModalOpen,
      setIsTransactionModalOpen
    }),
    [
      form,
      setForm,
      isEditMode,
      setIsEditMode,
      isProfileModalOpen,
      setIsProfileModalOpen,
      profileInfo,
      setProfileInfo,
      isTransactionModalOpen,
      setIsTransactionModalOpen
    ],
  )

  return <GlobalDataContext.Provider value={contextValue}>{children}</GlobalDataContext.Provider>
}

GlobalDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
