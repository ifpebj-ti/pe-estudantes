import { AnamnesisData } from "./AnamnesisData";
import { PlansEducationData } from "./PlansEducationData";
import { ScreeningData } from "./ScreeningData";

export interface ReportsData {
    anamnesis: AnamnesisData
    plansEducation: PlansEducationData
    screening: ScreeningData
}
