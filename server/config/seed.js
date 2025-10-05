import Medicine from '../models/Medicine.js';

/**
 * Seed database with sample medicines
 * Use this to populate the database with test data
 */
const seedMedicines = [
  {
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    quantity: 150,
    expiryDate: new Date('2025-12-31'),
    price: 5.99
  },
  {
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    quantity: 200,
    expiryDate: new Date('2026-03-15'),
    price: 7.50
  },
  {
    name: 'Amoxicillin 250mg',
    category: 'Antibiotic',
    quantity: 80,
    expiryDate: new Date('2025-11-20'),
    price: 12.99
  },
  {
    name: 'Cetirizine 10mg',
    category: 'Antihistamine',
    quantity: 120,
    expiryDate: new Date('2025-10-30'),
    price: 8.75
  },
  {
    name: 'Aspirin 100mg',
    category: 'Cardiovascular',
    quantity: 90,
    expiryDate: new Date('2024-08-15'),
    price: 6.50
  },
  {
    name: 'Omeprazole 20mg',
    category: 'Gastrointestinal',
    quantity: 60,
    expiryDate: new Date('2025-12-10'),
    price: 15.99
  },
  {
    name: 'Metformin 500mg',
    category: 'Diabetes',
    quantity: 100,
    expiryDate: new Date('2026-01-25'),
    price: 10.50
  },
  {
    name: 'Lisinopril 10mg',
    category: 'Cardiovascular',
    quantity: 75,
    expiryDate: new Date('2024-09-20'),
    price: 14.25
  },
  {
    name: 'Azithromycin 500mg',
    category: 'Antibiotic',
    quantity: 50,
    expiryDate: new Date('2025-11-05'),
    price: 18.99
  },
  {
    name: 'Loratadine 10mg',
    category: 'Antihistamine',
    quantity: 110,
    expiryDate: new Date('2026-02-14'),
    price: 9.25
  },
  {
    name: 'Vitamin D3 1000IU',
    category: 'Supplement',
    quantity: 200,
    expiryDate: new Date('2026-06-30'),
    price: 11.99
  },
  {
    name: 'Multivitamin Complex',
    category: 'Supplement',
    quantity: 150,
    expiryDate: new Date('2025-10-15'),
    price: 16.50
  }
];

/**
 * Seed the database
 * @param {boolean} clearExisting - Whether to clear existing data first
 */
export const seedDatabase = async (clearExisting = false) => {
  try {
    if (clearExisting) {
      await Medicine.deleteMany({});
      console.log('🗑️  Cleared existing medicines');
    }

    const medicines = await Medicine.insertMany(seedMedicines);
    console.log(`✅ Seeded ${medicines.length} medicines`);
    
    return medicines;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

export default seedMedicines;
