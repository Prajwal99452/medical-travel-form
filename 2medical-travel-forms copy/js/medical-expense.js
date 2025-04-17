// Declare datasets (replace with actual import if needed)
let currentDataset = {
  claimInfo: {
    claimNumber: "12345",
    workerAppId: "67890",
    submissionDate: "2024-01-01",
    workerName: "John Doe",
    totalPages: "2",
  },
  prescriptionDrugs: [],
  otcDrugs: [],
  medicalSupplies: [],
  parking: [],
  mileage: [],
  busOrTaxi: [],
}

const smallDataset = {
  claimInfo: {
    claimNumber: "11111",
    workerAppId: "22222",
    submissionDate: "2024-02-02",
    workerName: "Jane Smith",
    totalPages: "1",
  },
  prescriptionDrugs: [
    {
      drugName: "Aspirin",
      prescriptionDate: "2024-02-01",
      datePurchased: "2024-02-02",
      healthcareProviderName: "Dr. Smith",
      paidAmount: "5.00",
    },
  ],
  otcDrugs: [],
  medicalSupplies: [],
  parking: [],
  mileage: [],
  busOrTaxi: [],
}

const largeDataset = {
  claimInfo: {
    claimNumber: "33333",
    workerAppId: "44444",
    submissionDate: "2024-03-03",
    workerName: "Peter Jones",
    totalPages: "3",
  },
  prescriptionDrugs: [
    {
      drugName: "Aspirin",
      prescriptionDate: "2024-02-01",
      datePurchased: "2024-02-02",
      healthcareProviderName: "Dr. Smith",
      paidAmount: "5.00",
    },
    {
      drugName: "Ibuprofen",
      prescriptionDate: "2024-02-05",
      datePurchased: "2024-02-06",
      healthcareProviderName: "Dr. Jones",
      paidAmount: "7.50",
    },
  ],
  otcDrugs: [
    {
      drugName: "Vitamin C",
      datePurchased: "2024-02-10",
      paidAmount: "10.00",
      sellerName: "Pharmacy",
      reasonForPurchasing: "Cold",
    },
  ],
  medicalSupplies: [
    {
      itemPurchased: "Bandages",
      datePurchased: "2024-02-15",
      wasPrescribed: "Yes",
      healthcareProviderName: "Dr. Smith",
      paidAmount: "12.00",
      sellerName: "Pharmacy",
    },
  ],
  parking: [
    { appointmentDate: "2024-02-20", address: "Hospital", paidAmount: "8.00", meterUsed: "Yes", meterNumber: "123" },
  ],
  mileage: [
    { appointmentDate: "2024-02-25", healthcareAddress: "Hospital", workplaceAddress: "Home", kilometers: "20" },
  ],
  busOrTaxi: [
    {
      appointmentDate: "2024-03-01",
      startingPoint: "Home",
      destination: "Hospital",
      transportType: "Bus",
      farePaid: "3.50",
    },
  ],
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the form with the default dataset
  loadFormData(currentDataset)

  // Set up pagination
  const prevPageBtn = document.getElementById("prevPage")
  const nextPageBtn = document.getElementById("nextPage")
  const pageIndicator = document.getElementById("pageIndicator")
  const page1Content = document.querySelector(".form-content > div:not(#page2Content)")
  const page2Content = document.getElementById("page2Content")

  let currentPage = 1
  const totalPages = 2

  // Update page display
  function updatePageDisplay() {
    document.getElementById("currentPage").textContent = currentPage
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`

    if (currentPage === 1) {
      page1Content.style.display = "block"
      page2Content.style.display = "none"
      prevPageBtn.disabled = true
      nextPageBtn.disabled = false
    } else {
      page1Content.style.display = "none"
      page2Content.style.display = "block"
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

  // Demo control buttons
  const loadSmallDatasetBtn = document.getElementById("loadSmallDataset")
  const loadLargeDatasetBtn = document.getElementById("loadLargeDataset")

  loadSmallDatasetBtn.addEventListener("click", () => {
    currentDataset = smallDataset
    loadFormData(currentDataset)
    currentPage = 1
    updatePageDisplay()
  })

  loadLargeDatasetBtn.addEventListener("click", () => {
    currentDataset = largeDataset
    loadFormData(currentDataset)
    currentPage = 1
    updatePageDisplay()
  })

  // Initial page display
  updatePageDisplay()
})

// Function to load form data
function loadFormData(data) {
  // Update claim info
  document.getElementById("claimNumber").textContent = data.claimInfo.claimNumber
  document.getElementById("workerAppId").textContent = data.claimInfo.workerAppId
  document.getElementById("submissionDate").textContent = data.claimInfo.submissionDate
  document.getElementById("workerName").textContent = data.claimInfo.workerName
  document.getElementById("totalPages").textContent = data.claimInfo.totalPages

  // Update prescription drugs table
  const prescriptionDrugsTable = document.getElementById("prescriptionDrugsTable").getElementsByTagName("tbody")[0]
  prescriptionDrugsTable.innerHTML = ""

  data.prescriptionDrugs.forEach((drug) => {
    const row = prescriptionDrugsTable.insertRow()
    row.innerHTML = `
            <td>${drug.drugName}</td>
            <td>${drug.prescriptionDate}</td>
            <td>${drug.datePurchased}</td>
            <td>${drug.healthcareProviderName}</td>
            <td>${drug.paidAmount}</td>
        `
  })

  // Update OTC drugs table
  const otcDrugsTable = document.getElementById("otcDrugsTable").getElementsByTagName("tbody")[0]
  otcDrugsTable.innerHTML = ""

  data.otcDrugs.forEach((drug) => {
    const row = otcDrugsTable.insertRow()
    row.innerHTML = `
            <td>${drug.drugName}</td>
            <td>${drug.datePurchased}</td>
            <td>${drug.paidAmount}</td>
            <td>${drug.sellerName}</td>
            <td>${drug.reasonForPurchasing}</td>
        `
  })

  // Update medical supplies table
  const medicalSuppliesTable = document.getElementById("medicalSuppliesTable").getElementsByTagName("tbody")[0]
  medicalSuppliesTable.innerHTML = ""

  data.medicalSupplies.forEach((item) => {
    const row = medicalSuppliesTable.insertRow()
    row.innerHTML = `
            <td>${item.itemPurchased}</td>
            <td>${item.datePurchased}</td>
            <td>${item.wasPrescribed}</td>
            <td>${item.healthcareProviderName}</td>
            <td>${item.paidAmount}</td>
            <td>${item.sellerName}</td>
        `
  })

  // Update parking table
  const parkingTable = document.getElementById("parkingTable").getElementsByTagName("tbody")[0]
  parkingTable.innerHTML = ""

  data.parking.forEach((item) => {
    const row = parkingTable.insertRow()
    row.innerHTML = `
            <td>${item.appointmentDate}</td>
            <td>${item.address}</td>
            <td>${item.paidAmount}</td>
            <td>${item.meterUsed}</td>
            <td>${item.meterNumber}</td>
        `
  })

  // Update mileage table
  const mileageTable = document.getElementById("mileageTable").getElementsByTagName("tbody")[0]
  mileageTable.innerHTML = ""

  data.mileage.forEach((item) => {
    const row = mileageTable.insertRow()
    row.innerHTML = `
            <td>${item.appointmentDate}</td>
            <td>${item.healthcareAddress}</td>
            <td>${item.workplaceAddress}</td>
            <td>${item.kilometers}</td>
        `
  })

  // Update bus or taxi table
  const busOrTaxiTable = document.getElementById("busOrTaxiTable").getElementsByTagName("tbody")[0]
  busOrTaxiTable.innerHTML = ""

  data.busOrTaxi.forEach((item) => {
    const row = busOrTaxiTable.insertRow()
    row.innerHTML = `
            <td>${item.appointmentDate}</td>
            <td>${item.startingPoint}</td>
            <td>${item.destination}</td>
            <td>${item.transportType}</td>
            <td>${item.farePaid}</td>
        `
  })
}
