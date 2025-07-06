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
  const [billForm, setBillForm] = useState({
    name: "",
    amount: "",
    frequency: "",
    dueDate: "",
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
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);




  const contextValue = useMemo(
    () => ({
      form,
      setForm,
      billForm,
      setBillForm,
      isEditMode,
      setIsEditMode,
      isProfileModalOpen,
      setIsProfileModalOpen,
      profileInfo,
      setProfileInfo,
      isTransactionModalOpen,
      setIsTransactionModalOpen,
      isBillModalOpen,
      setIsBillModalOpen
    }),
    [
      form,
      setForm,
      billForm,
      setBillForm,
      isEditMode,
      setIsEditMode,
      isProfileModalOpen,
      setIsProfileModalOpen,
      profileInfo,
      setProfileInfo,
      isTransactionModalOpen,
      setIsTransactionModalOpen,
      isBillModalOpen,
      setIsBillModalOpen
    ],
  )

  return <GlobalDataContext.Provider value={contextValue}>{children}</GlobalDataContext.Provider>
}

GlobalDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
