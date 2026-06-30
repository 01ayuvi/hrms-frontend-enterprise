import { useEffect, useState } from "react";
import {
    getPolicies,
    updatePolicy,
} from "../../services/organizationService";
import "./Organization.css";

function OrganizationPolicyPage() {
    const [form, setForm] = useState({
        policy_id: null,
        working_days: "",
        office_start_time: "",
        office_end_time: "",
        late_mark_after: "",
        half_day_after: "",
        annual_leave_limit: 0,
        casual_leave_limit: 0,
        sick_leave_limit: 0,
        probation_months: 0,
        notice_period_days: 0,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadPolicies();
    }, []);

    const loadPolicies = async () => {
        try {
            setLoading(true);

            const data = await getPolicies();

            if (data && data.length > 0) {
                setForm(data[0]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
            setSaving(true);

            await updatePolicy(form);

            alert("Policy updated successfully.");

            await loadPolicies();
        } catch (error) {
            console.error(error);
            alert("Update failed.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="organization-page">
            <h1>Organization Policies</h1>

            <div className="organization-card">
                <div className="organization-grid">

                    <div className="section-title">
                        Working Hours
                    </div>

                    <div>
                        <label>Working Days</label>

                        <input
                            type="text"
                            name="working_days"
                            value={form.working_days}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Office Start Time</label>

                        <input
                            type="time"
                            name="office_start_time"
                            value={form.office_start_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Office End Time</label>

                        <input
                            type="time"
                            name="office_end_time"
                            value={form.office_end_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Late Mark After</label>

                        <input
                            type="time"
                            name="late_mark_after"
                            value={form.late_mark_after}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Half Day After</label>

                        <input
                            type="time"
                            name="half_day_after"
                            value={form.half_day_after}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="section-title">
                        Leave Policies
                    </div>

                    <div>
                        <label>Annual Leave Limit</label>

                        <input
                            type="number"
                            name="annual_leave_limit"
                            value={form.annual_leave_limit}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Casual Leave Limit</label>

                        <input
                            type="number"
                            name="casual_leave_limit"
                            value={form.casual_leave_limit}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Sick Leave Limit</label>

                        <input
                            type="number"
                            name="sick_leave_limit"
                            value={form.sick_leave_limit}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="section-title">
                        Employment Policies
                    </div>

                    <div>
                        <label>Probation Months</label>

                        <input
                            type="number"
                            name="probation_months"
                            value={form.probation_months}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Notice Period Days</label>

                        <input
                            type="number"
                            name="notice_period_days"
                            value={form.notice_period_days}
                            onChange={handleChange}
                        />
                    </div>

                </div>

            </div>

            <button
                onClick={handleSave}
                disabled={saving}
            >
                {saving ? "Saving..." : "Save Policies"}
            </button>
        </div>
    );
}

export default OrganizationPolicyPage;