import { Skill } from "./skill.model";
import { User } from "./user.model";

export class CandidateSkill {
  id?: any;
  value?: any;
  notes?: any;
  skill?: Skill;
  candidate?: User;
}
