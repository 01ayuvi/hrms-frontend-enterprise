import { useEffect, useState } from "react";

import {
    getPolicies,
} from "../../services/organizationService";

function OrganizationPolicyPage() {

    const [policies, setPolicies] =
        useState([]);

    useEffect(() => {
        loadPolicies();
    }, []);

    const loadPolicies = async () => {
        try {
            const data =
                await getPolicies();

            setPolicies(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>
                Organization Policies
            </h1>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse:
                        "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th>
                            Working Days
                        </th>

                        <th>
                            Office Start
                        </th>

                        <th>
                            Office End
                        </th>

                        <th>
                            Late Mark
                        </th>

                        <th>
                            Half Day
                        </th>

                        <th>
                            Annual Leave
                        </th>

                        <th>
                            Casual Leave
                        </th>

                        <th>
                            Sick Leave
                        </th>

                        <th>
                            Probation
                        </th>

                        <th>
                            Notice Period
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {policies.map(
                        (policy) => (
                            <tr
                                key={
                                    policy.policy_id
                                }
                            >
                                <td>
                                    {
                                        policy.working_days
                                    }
                                </td>

                                <td>
                                    {
                                        policy.office_start_time
                                    }
                                </td>

                                <td>
                                    {
                                        policy.office_end_time
                                    }
                                </td>

                                <td>
                                    {
                                        policy.late_mark_after
                                    }
                                </td>

                                <td>
                                    {
                                        policy.half_day_after
                                    }
                                </td>

                                <td>
                                    {
                                        policy.annual_leave_limit
                                    }
                                </td>

                                <td>
                                    {
                                        policy.casual_leave_limit
                                    }
                                </td>

                                <td>
                                    {
                                        policy.sick_leave_limit
                                    }
                                </td>

                                <td>
                                    {
                                        policy.probation_months
                                    } Months
                                </td>

                                <td>
                                    {
                                        policy.notice_period_days
                                    } Days
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrganizationPolicyPage;