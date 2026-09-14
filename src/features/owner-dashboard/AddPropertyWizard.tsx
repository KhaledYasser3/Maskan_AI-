import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { useToast } from '../../context/ToastContext';

export interface AddPropertyWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPropertyData: any) => void;
}

export const AddPropertyWizard: React.FC<AddPropertyWizardProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { success } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [neighborhood, setNeighborhood] = useState('Dokki');
  const [universityArea, setUniversityArea] = useState('Cairo University');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const [totalBedrooms, setTotalBedrooms] = useState(3);
  const [totalBathrooms, setTotalBathrooms] = useState(2);
  const [maxStudents, setMaxStudents] = useState(3);
  const [rentAmount, setRentAmount] = useState(6000);
  const [depositAmount, setDepositAmount] = useState(6000);
  const [isFurnished, setIsFurnished] = useState(true);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Fiber Wi-Fi',
    'Study Desks',
    'Air Conditioning',
    'Elevator',
  ]);

  const amenitiesOptions = [
    'Fiber Wi-Fi',
    'Air Conditioning',
    'Study Desks',
    'Elevator',
    'Balcony',
    'Natural Gas',
    'Washing Machine',
    'Full Kitchen',
    'Security Guard',
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleFinish = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newProperty = {
        id: `prop_${Date.now()}`,
        title,
        neighborhood,
        universityArea,
        address,
        description,
        totalBedrooms,
        totalBathrooms,
        maxStudents,
        rentAmount,
        depositAmount,
        isFurnished,
        amenities: selectedAmenities,
        verificationStatus: 'PENDING',
      };
      success('Student property added! Ready for verification.', 'Property Created');
      onSuccess(newProperty);
      onClose();
      setStep(1);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add New Student Residence (Step ${step} of 3)`}
      description="List your flat to verified Cairo university students"
      maxWidth="lg"
    >
      <div className="flex flex-col gap-6 text-left py-2">
        {/* Stepper Indicator */}
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div
            className={`flex items-center gap-2 text-label-sm font-bold ${
              step >= 1 ? 'text-primary' : 'text-on-surface-variant/40'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container'
              }`}
            >
              1
            </span>
            <span>Location & Title</span>
          </div>

          <span className="text-outline-variant">• • •</span>

          <div
            className={`flex items-center gap-2 text-label-sm font-bold ${
              step >= 2 ? 'text-primary' : 'text-on-surface-variant/40'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container'
              }`}
            >
              2
            </span>
            <span>Specs & Rent</span>
          </div>

          <span className="text-outline-variant">• • •</span>

          <div
            className={`flex items-center gap-2 text-label-sm font-bold ${
              step >= 3 ? 'text-primary' : 'text-on-surface-variant/40'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-container'
              }`}
            >
              3
            </span>
            <span>Amenities & Photos</span>
          </div>
        </div>

        {/* Step 1: Location & Details */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <Input
              label="Listing Title"
              placeholder="e.g. Al-Dokki Academic Residence, Apt 4"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="University Target Area"
                options={[
                  { value: 'Cairo University', label: 'Cairo University' },
                  { value: 'Ain Shams University', label: 'Ain Shams University' },
                  { value: 'GUC / New Cairo', label: 'German University in Cairo' },
                ]}
                value={universityArea}
                onChange={(e) => setUniversityArea(e.target.value)}
              />
              <Select
                label="Neighborhood"
                options={[
                  { value: 'Dokki', label: 'Dokki' },
                  { value: 'Giza', label: 'Giza Square / Bein El-Sarayat' },
                  { value: 'Nasr City', label: 'Nasr City' },
                  { value: 'New Cairo', label: 'New Cairo' },
                ]}
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </div>

            <Input
              label="Exact Street Address"
              placeholder="e.g. 34 El-Messaha Square, Dokki, Giza"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Textarea
              label="Description for Students"
              placeholder="Describe proximity to campus gates, quiet study environment, nearby metro stations..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}

        {/* Step 2: Specs & Pricing */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Bedrooms"
                type="number"
                min={1}
                max={10}
                value={totalBedrooms}
                onChange={(e) => setTotalBedrooms(Number(e.target.value))}
              />
              <Input
                label="Bathrooms"
                type="number"
                min={1}
                max={5}
                value={totalBathrooms}
                onChange={(e) => setTotalBathrooms(Number(e.target.value))}
              />
              <Input
                label="Capacity (Students)"
                type="number"
                min={1}
                max={10}
                value={maxStudents}
                onChange={(e) => setMaxStudents(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Total Monthly Rent (EGP)"
                type="number"
                min={1000}
                step={100}
                value={rentAmount}
                onChange={(e) => setRentAmount(Number(e.target.value))}
                helperText={`Each student pays ~EGP ${Math.round(rentAmount / maxStudents)}/mo`}
              />
              <Input
                label="Security Deposit (EGP)"
                type="number"
                min={0}
                step={100}
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                helperText="Fully refundable upon checkout"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFurnished}
                  onChange={(e) => setIsFurnished(e.target.checked)}
                  className="w-4 h-4 accent-secondary rounded"
                />
                <span className="text-body-md text-on-surface font-semibold">
                  Unit is fully furnished for students (Beds, Desks, Closets)
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Amenities & Photos */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-label-md font-semibold text-primary block mb-2">
                Select Amenities Included
              </label>
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((am) => (
                  <button
                    key={am}
                    type="button"
                    onClick={() => toggleAmenity(am)}
                    className={`px-3 py-1.5 rounded-full text-label-sm font-semibold transition-all border ${
                      selectedAmenities.includes(am)
                        ? 'bg-secondary text-on-secondary border-secondary'
                        : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30'
                    }`}
                  >
                    {am}
                  </button>
                ))}
              </div>
            </div>

            <FileUpload
              label="Upload Flat Photos (Min 3 recommended)"
              helperText="JPEG, PNG or WEBP (Max 10MB per file)"
              onFileSelect={() => {}}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          )}

          {step < 3 ? (
            <Button
              variant="primary"
              disabled={step === 1 && !title.trim()}
              onClick={() => setStep(step + 1)}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="accent"
              isLoading={isLoading}
              onClick={handleFinish}
            >
              Publish Listing
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
