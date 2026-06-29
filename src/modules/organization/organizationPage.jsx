import { useEffect, useState } from "react";
import {
    getOrganization,
    updateOrganization,
    uploadLogo,
} from "../../services/organizationService";

import "./Organization.css";

const organizationTypes = [
    "Private Limited Company (Pvt Ltd)",
    "Public Limited Company",
    "Limited Liability Partnership (LLP)",
    "Partnership Firm",
    "Sole Proprietorship",
    "One Person Company (OPC)",
    "Government Organization",
    "Non-Governmental Organization (NGO)",
    "Trust",
    "Society",
];

const industries = [
    "IT Services",
    "Software Development",
    "Information Technology",
    "Healthcare",
    "Banking & Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Telecommunications",
    "Construction",
    "Pharmaceutical",
    "Automobile",
    "Real Estate",
    "Hospitality",
    "Logistics",
    "Consulting",
    "Media & Entertainment",
    "Energy",
    "Government",
    "Other",
];

const initialForm = {
    company_name: "",
    organization_type: "",
    company_code: "",
    gst_number: "",
    cin_number: "",
    pan_number: "",
    industry: "",
    website: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    timezone: "",
    employee_strength: "",
    address: "",
    logo_path: "",
};

export default function OrganizationPage() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadOrganization();
    }, []);

    const loadOrganization = async () => {

        try {

            setLoading(true);

            const data = await getOrganization();
            console.log("Organization Data:", data);

            setForm({
                ...initialForm,
                ...data,
            });

        } catch (error) {

            console.error("Failed to load organization", error);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogoUpload = async (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    try {

        setUploading(true);

        await uploadLogo(file);

        // Reload organization details so the new logo_path
        // is fetched from the backend.
        await loadOrganization();

        alert("Logo uploaded successfully.");

    } catch (error) {

        console.error(error);

        alert("Logo upload failed.");

    } finally {

        setUploading(false);

    }

};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await updateOrganization(form);

            alert("Organization updated successfully.");
        } catch (error) {
            console.error(error);
            alert("Unable to update organization.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="organization-page">
                <h2 className="page-title">Organization Settings</h2>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="organization-page">
            <h2 className="page-title">Organization Settings</h2>

            <form
                className="organization-card"
                onSubmit={handleSubmit}
            >
                <div className="organization-grid">

                    <div className="full-width">
                        <label>Company Logo</label>

                        {form.logo_path && (
                            <div style={{ marginBottom: "15px" }}>
                                <img
                                    src={`http://127.0.0.1:8000/${form.logo_path}`}
                                    alt="Company Logo"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        objectFit: "contain",
                                        border: "1px solid #ddd",
                                        borderRadius: 8,
                                        padding: 10,
                                        background: "#fff",
                                    }}
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                        />

                        {uploading && <p>Uploading...</p>}
                    </div>

                    <input
                        name="name"
                        placeholder="Company Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <div>
                        <label>Organization Type</label>

                        <select
                            name="organization_type"
                            value={form.organization_type}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>

                            {organizationTypes.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Company Code</label>

                        <input
                            type="text"
                            name="company_code"
                            value={form.company_code}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>GST Number</label>

                        <input
                            type="text"
                            name="gst_number"
                            value={form.gst_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>CIN Number</label>

                        <input
                            type="text"
                            name="cin_number"
                            value={form.cin_number}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>PAN Number</label>

                        <input
                            type="text"
                            name="pan_number"
                            value={form.pan_number}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Industry</label>

                        <select
                            name="industry"
                            value={form.industry}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>

                            {industries.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Website</label>

                        <input
                            type="url"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>City</label>

                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>State</label>

                        <input
                            type="text"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Country</label>

                        <input
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Postal Code</label>

                        <input
                            type="text"
                            name="postal_code"
                            value={form.postal_code}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Timezone</label>

                        <input
                            type="text"
                            name="timezone"
                            value={form.timezone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Employee Strength</label>

                        <input
                            type="number"
                            name="employee_strength"
                            value={form.employee_strength}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="full-width">
                        <label>Address</label>

                        <textarea
                            name="address"
                            rows="5"
                            value={form.address}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <button
                    type="submit"
                    className="save-btn"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Organization"}
                </button>

            </form>
        </div>
    );
}