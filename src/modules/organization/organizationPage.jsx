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
        <div style={{ padding: "30px" }}>
            <h1>Organization Settings</h1>

            <div>
                <label>Company Name</label>
                <br />
                <input
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Company Code</label>
                <br />
                <input
                    name="company_code"
                    value={form.company_code || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>GST Number</label>
                <br />
                <input
                    name="gst_number"
                    value={form.gst_number || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>CIN Number</label>
                <br />
                <input
                    name="cin_number"
                    value={form.cin_number || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>PAN Number</label>
                <br />
                <input
                    name="pan_number"
                    value={form.pan_number || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Industry</label>
                <br />
                <input
                    name="industry"
                    value={form.industry || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Website</label>
                <br />
                <input
                    name="website"
                    value={form.website || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Email</label>
                <br />
                <input
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Phone</label>
                <br />
                <input
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Address</label>
                <br />
                <textarea
                    name="address"
                    value={form.address || ""}
                    onChange={handleChange}
                    rows="3"
                    cols="40"
                />
            </div>

            <br />

            <div>
                <label>City</label>
                <br />
                <input
                    name="city"
                    value={form.city || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>State</label>
                <br />
                <input
                    name="state"
                    value={form.state || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Country</label>
                <br />
                <input
                    name="country"
                    value={form.country || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Postal Code</label>
                <br />
                <input
                    name="postal_code"
                    value={form.postal_code || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Timezone</label>
                <br />
                <input
                    name="timezone"
                    value={form.timezone || ""}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Employee Strength</label>
                <br />
                <input
                    type="number"
                    name="employee_strength"
                    value={form.employee_strength || 0}
                    onChange={handleChange}
                />
            </div>

            <br />

            <button onClick={handleSave}>
                Save Organization
            </button>
        </div>
    );
}

export default OrganizationPage;