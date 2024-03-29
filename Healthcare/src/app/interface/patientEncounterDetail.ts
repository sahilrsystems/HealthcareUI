export interface PatientEncounterDetail {
    PartitionKey: string;
    RowKey: string;
    Timestamp: Date;
    ETag: string;
    RecordingBlobPath: string;
    ConsultationStartDateTime: Date;
    ConsultationEndDateTime: Date;
    OriginalJson: string;
    UpdatedJson: string;
}