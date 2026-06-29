import { useEffect, useState } from "react";

import {
    getOrganization,
    updateOrganization,
} from "../../services/organizationService";

function OrganizationPage() {
    const [form, setForm] = useState({
        name: "",
        company_code: "",
        gst_number: "",
        cin_number: "",
        pan_number: "",
        industry: "",
        website: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        timezone: "",
        employee_strength: 0,
    });

    useEffect(() => {
        loadOrganization();
    }, []);

    const loadOrganization = async () => {
        try {
            const data = await getOrganization();
            setForm(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            await updateOrganization(form);

            alert(
                "Organization Updated Successfully"
            );
        } catch (error) {
            console.error(error);
            alert("Update Failed");
        }
    };

    return (
        <div className="organization-page">

            <h1 className="page-title">
            Organization Settings
            </h1>

            <div className="organization-card">

            <div className="organization-grid">

                <div>
                <label>Company Name</label>
                <input
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Company Code</label>
                <input
                    name="company_code"
                    value={form.company_code || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>GST Number</label>
                <input
                    name="gst_number"
                    value={form.gst_number || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>CIN Number</label>
                <input
                    name="cin_number"
                    value={form.cin_number || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>PAN Number</label>
                <input
                    name="pan_number"
                    value={form.pan_number || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Industry</label>
                <input
                    name="industry"
                    value={form.industry || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Website</label>
                <input
                    name="website"
                    value={form.website || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Email</label>
                <input
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Phone</label>
                <input
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>City</label>
                <input
                    name="city"
                    value={form.city || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>State</label>
                <input
                    name="state"
                    value={form.state || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Country</label>
                <input
                    name="country"
                    value={form.country || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Postal Code</label>
                <input
                    name="postal_code"
                    value={form.postal_code || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Timezone</label>
                <input
                    name="timezone"
                    value={form.timezone || ""}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label>Employee Strength</label>
                <input
                    type="number"
                    name="employee_strength"
                    value={form.employee_strength || 0}
                    onChange={handleChange}
                />
                </div>

            </div>

            <div className="full-width">

                <label>Address</label>

                <textarea
                name="address"
                rows="4"
                value={form.address || ""}
                onChange={handleChange}
                />

            </div>

            <button
                className="save-btn"
                onClick={handleSave}
            >
                Save Organization
            </button>

            </div>

        </div>
        );
}

export default OrganizationPage;