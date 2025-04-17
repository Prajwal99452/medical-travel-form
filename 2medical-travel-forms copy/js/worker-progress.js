document.addEventListener("DOMContentLoaded", () => {
  // Initialize the form with the default dataset
  // Mock workerProgressData for demonstration purposes
  const workerProgressData = {
    workerInfo: {
      workerAppId: "12345",
      submissionDate: "2024-01-01",
      workerName: "John Doe",
      totalPages: "3",
    },
    recovery: {
      returnStatus: "Good",
    },
    returnToWork: {
      status: "returned",
      returnDate: "2024-01-15",
      workType: "full-regular",
      expectedReturnDate: "2024-02-01",
      concerns: "None",
      employerContact: "Jane Smith",
      contactDate: "2024-01-10",
    },
    workStatus: {
      status: "not missed",
    },
    painScale: 5,
    medicalTreatment: {
      status: "continuing",
      providerType: "Physiotherapist",
      lastTreatmentDate: "2024-01-08",
      lastProviderName: "Dr. Alice Brown",
      nextTreatmentDate: "2024-01-22",
      nextProviderName: "Dr. Alice Brown",
      frequency: "Weekly",
    },
    medication: {
      status: "taking",
      medicationName: "Ibuprofen",
    },
    exercises: {
      status: "doing",
      exerciseList: "Stretching, light cardio",
    },
    recoveryStatus: {
      status: "not recovered",
      comments: "Still experiencing some pain",
    },
    additionalInfo: "No additional information",
  }
  loadFormData(workerProgressData)

  // Set up pagination
  const prevPageBtn = document.getElementById("prevPage")
  const nextPageBtn = document.getElementById("nextPage")
  const pageIndicator = document.getElementById("pageIndicator")
  const page1Content = document.querySelector(".form-content > div:not(#page2Content):not(#page3Content)")
  const page2Content = document.getElementById("page2Content")
  const page3Content = document.getElementById("page3Content")

  let currentPage = 1
  const totalPages = 3

  // Update page display
  function updatePageDisplay() {
    document.getElementById("currentPage").textContent = currentPage
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`

    if (currentPage === 1) {
      page1Content.style.display = "block"
      page2Content.style.display = "none"
      page3Content.style.display = "none"
      prevPageBtn.disabled = true
      nextPageBtn.disabled = false
    } else if (currentPage === 2) {
      page1Content.style.display = "none"
      page2Content.style.display = "block"
      page3Content.style.display = "none"
      prevPageBtn.disabled = false
      nextPageBtn.disabled = false
    } else {
      page1Content.style.display = "none"
      page2Content.style.display = "none"
      page3Content.style.display = "block"
      prevPageBtn.disabled = false
      nextPageBtn.disabled = true
    }
  }

  // Page navigation event listeners
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--
      updatePageDisplay()
    }
  })

  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++
      updatePageDisplay()
    }
  })

  // Form interaction event listeners
  const returnedRadio = document.getElementById("returned")
  const notReturnedRadio = document.getElementById("notReturned")
  const returnDateInput = document.getElementById("returnDate")
  const workTypeRadios = document.querySelectorAll('input[name="workType"]')

  returnedRadio.addEventListener("change", function () {
    if (this.checked) {
      returnDateInput.disabled = false
      workTypeRadios.forEach((radio) => {
        radio.disabled = false
      })
    }
  })

  notReturnedRadio.addEventListener("change", function () {
    if (this.checked) {
      returnDateInput.disabled = true
      returnDateInput.value = ""
      workTypeRadios.forEach((radio) => {
        radio.disabled = true
        radio.checked = false
      })
    }
  })

  // Treatment status radio buttons
  const treatmentStatusRadios = document.querySelectorAll('input[name="treatmentStatus"]')
  const treatmentTypeInput = document.querySelector(".treatment-status .text-input")

  treatmentStatusRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "continuing") {
        treatmentTypeInput.disabled = false
      } else {
        treatmentTypeInput.disabled = true
        treatmentTypeInput.value = ""
      }
    })
  })

  // Medication status radio buttons
  const medicationStatusRadios = document.querySelectorAll('input[name="medicationStatus"]')
  const medicationNameInput = document.querySelector(".medication .text-input")

  medicationStatusRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "taking") {
        medicationNameInput.disabled = false
      } else {
        medicationNameInput.disabled = true
        medicationNameInput.value = ""
      }
    })
  })

  // Exercise status radio buttons
  const exerciseStatusRadios = document.querySelectorAll('input[name="exerciseStatus"]')
  const exerciseListTextarea = document.querySelector(".exercise-list .textarea-input")

  exerciseStatusRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "doing") {
        exerciseListTextarea.disabled = false
      } else {
        exerciseListTextarea.disabled = true
        exerciseListTextarea.value = ""
      }
    })
  })

  // Demo control button
  const updateFormDataBtn = document.getElementById("updateFormData")

  // Mock generateRandomData for demonstration purposes
  function generateRandomData() {
    const randomPainScale = Math.floor(Math.random() * 10) + 1
    const randomReturnStatus = Math.random() < 0.5 ? "returned" : "not returned"
    const randomTreatmentStatus = Math.random() < 0.5 ? "continuing" : "not continuing"
    const randomMedicationStatus = Math.random() < 0.5 ? "taking" : "not taking"
    const randomExerciseStatus = Math.random() < 0.5 ? "doing" : "not doing"
    const randomRecoveryStatus = Math.random() < 0.5 ? "recovered" : "not recovered"

    return {
      workerInfo: {
        workerAppId: Math.floor(Math.random() * 100000).toString(),
        submissionDate: "2024-01-" + Math.floor(Math.random() * 31 + 1).toString(),
        workerName: "Random Name",
        totalPages: "3",
      },
      recovery: {
        returnStatus: "Random Status",
      },
      returnToWork: {
        status: randomReturnStatus,
        returnDate: randomReturnStatus === "returned" ? "2024-01-" + Math.floor(Math.random() * 31 + 1).toString() : "",
        workType: "full-regular",
        expectedReturnDate: "2024-02-" + Math.floor(Math.random() * 28 + 1).toString(),
        concerns: "Random Concerns",
        employerContact: "Random Contact",
        contactDate: "2024-01-" + Math.floor(Math.random() * 31 + 1).toString(),
      },
      workStatus: {
        status: "not missed",
      },
      painScale: randomPainScale,
      medicalTreatment: {
        status: randomTreatmentStatus,
        providerType: randomTreatmentStatus === "continuing" ? "Random Provider" : "",
        lastTreatmentDate: "2024-01-" + Math.floor(Math.random() * 31 + 1).toString(),
        lastProviderName: "Random Doctor",
        nextTreatmentDate: "2024-01-" + Math.floor(Math.random() * 31 + 1).toString(),
        nextProviderName: "Random Doctor",
        frequency: "Weekly",
      },
      medication: {
        status: randomMedicationStatus,
        medicationName: randomMedicationStatus === "taking" ? "Random Medication" : "",
      },
      exercises: {
        status: randomExerciseStatus,
        exerciseList: randomExerciseStatus === "doing" ? "Random Exercises" : "",
      },
      recoveryStatus: {
        status: randomRecoveryStatus,
        comments: "Random Comments",
      },
      additionalInfo: "Random Additional Info",
    }
  }

  updateFormDataBtn.addEventListener("click", () => {
    const randomData = generateRandomData()
    loadFormData(randomData)
    currentPage = 1
    updatePageDisplay()
  })

  // Initial page display
  updatePageDisplay()
})

// Function to load form data
function loadFormData(data) {
  // Update worker info
  document.getElementById("workerAppId").textContent = data.workerInfo.workerAppId
  document.getElementById("submissionDate").textContent = data.workerInfo.submissionDate
  document.getElementById("workerName").textContent = data.workerInfo.workerName
  document.getElementById("totalPages").textContent = data.workerInfo.totalPages

  // Update recovery section
  document.getElementById("returnStatus").textContent = data.recovery.returnStatus

  // Update return to work section
  if (data.returnToWork.status === "returned") {
    document.getElementById("returned").checked = true
    document.getElementById("notReturned").checked = false
    document.getElementById("returnDate").disabled = false
    document.getElementById("returnDate").value = data.returnToWork.returnDate

    // Enable and set work type radios
    const workTypeRadios = document.querySelectorAll('input[name="workType"]')
    workTypeRadios.forEach((radio) => {
      radio.disabled = false
    })

    if (data.returnToWork.workType) {
      // Find the correct radio button based on workType value
      const workTypeIndex = ["full-regular", "full-reduced", "modified-regular", "modified-reduced", "other"].indexOf(
        data.returnToWork.workType,
      )
      if (workTypeIndex >= 0 && workTypeIndex < workTypeRadios.length) {
        workTypeRadios[workTypeIndex].checked = true
      }
    }
  } else {
    document.getElementById("notReturned").checked = true
    document.getElementById("returned").checked = false
    document.getElementById("returnDate").disabled = true
    document.getElementById("returnDate").value = ""

    // Disable work type radios
    const workTypeRadios = document.querySelectorAll('input[name="workType"]')
    workTypeRadios.forEach((radio) => {
      radio.disabled = true
      radio.checked = false
    })
  }

  // Update expected return date and concerns
  document.getElementById("expectedReturnDate").value = data.returnToWork.expectedReturnDate || ""
  document.getElementById("returnConcerns").value = data.returnToWork.concerns || ""
  document.getElementById("employerContact").value = data.returnToWork.employerContact || ""
  document.getElementById("contactDate").value = data.returnToWork.contactDate || ""

  // Update work status
  const workStatusRadios = document.querySelectorAll('input[name="workStatus"]')
  if (data.workStatus.status === "not missed") {
    workStatusRadios[0].checked = true
  } else {
    workStatusRadios[1].checked = true
  }

  // Update pain scale
  const painScaleRadios = document.querySelectorAll('input[name="painScale"]')
  if (data.painScale >= 1 && data.painScale <= 10) {
    painScaleRadios[data.painScale - 1].checked = true
  }

  // Update medical treatment
  const treatmentStatusRadios = document.querySelectorAll('input[name="treatmentStatus"]')
  const treatmentTypeInput = document.querySelector(".treatment-status .text-input")

  if (data.medicalTreatment.status === "continuing") {
    treatmentStatusRadios[1].checked = true
    treatmentTypeInput.disabled = false
    treatmentTypeInput.value = data.medicalTreatment.providerType || ""
  } else {
    treatmentStatusRadios[0].checked = true
    treatmentTypeInput.disabled = true
    treatmentTypeInput.value = ""
  }

  // Update last and next treatment info
  const lastTreatmentDateInput = document.querySelector(".last-treatment .date-input")
  const lastProviderNameInput = document.querySelector(".last-treatment .text-input")
  const nextTreatmentDateInput = document.querySelector(".next-treatment .date-input")
  const nextProviderNameInput = document.querySelector(".next-treatment .text-input")
  const frequencyInput = document.querySelector(".treatment-frequency .text-input")

  lastTreatmentDateInput.value = data.medicalTreatment.lastTreatmentDate || ""
  lastProviderNameInput.value = data.medicalTreatment.lastProviderName || ""
  nextTreatmentDateInput.value = data.medicalTreatment.nextTreatmentDate || ""
  nextProviderNameInput.value = data.medicalTreatment.nextProviderName || ""
  frequencyInput.value = data.medicalTreatment.frequency || ""

  // Update medication
  const medicationStatusRadios = document.querySelectorAll('input[name="medicationStatus"]')
  const medicationNameInput = document.querySelector(".medication .text-input")

  if (data.medication.status === "taking") {
    medicationStatusRadios[1].checked = true
    medicationNameInput.disabled = false
    medicationNameInput.value = data.medication.medicationName || ""
  } else {
    medicationStatusRadios[0].checked = true
    medicationNameInput.disabled = true
    medicationNameInput.value = ""
  }

  // Update exercises
  const exerciseStatusRadios = document.querySelectorAll('input[name="exerciseStatus"]')
  const exerciseListTextarea = document.querySelector(".exercise-list .textarea-input")

  if (data.exercises.status === "doing") {
    exerciseStatusRadios[1].checked = true
    exerciseListTextarea.disabled = false
    exerciseListTextarea.value = data.exercises.exerciseList || ""
  } else {
    exerciseStatusRadios[0].checked = true
    exerciseListTextarea.disabled = true
    exerciseListTextarea.value = ""
  }

  // Update recovery status
  const recoveryStatusRadios = document.querySelectorAll('input[name="recoveryStatus"]')

  if (data.recoveryStatus.status === "recovered") {
    recoveryStatusRadios[1].checked = true
  } else {
    recoveryStatusRadios[0].checked = true
  }

  document.getElementById("recoveryComments").value = data.recoveryStatus.comments || ""

  // Update additional info
  document.getElementById("additionalInfo").value = data.additionalInfo || ""
}
