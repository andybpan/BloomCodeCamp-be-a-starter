package com.hcc.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
    PENDING_SUBMISSION("Pending Submission", 1),
    SUBMITTED("Submitted", 2),
    IN_REVIEW("In Review", 3),
    NEEDS_UPDATE("Needs Update", 4),
    COMPLETED("Completed", 5),
    RESUBMITTED("Resubmitted", 6);

    private String status;
    private Integer step;
    AssignmentStatusEnum(String status, Integer step) {
        this.status = status;
        this.step = step;
    }

    public String getStatus() {
        return status;
    }

    public Integer getStep() {
        return step;
    }


    public static AssignmentStatusEnum fromString(String status) {
        if (status == null) {
            throw new IllegalArgumentException("Status value cannot be null");
        }
        for (AssignmentStatusEnum assignmentStatus : values()) {
            if (assignmentStatus.name().equalsIgnoreCase(status)) {
                return assignmentStatus;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + status);
    }
}