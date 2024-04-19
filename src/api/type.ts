export interface applicationOK {
  id: string;
  username: string;
  start_time: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

export interface earlyReturnHome {
  id: string;
  username: string;
  start_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

export interface Accept {
  type: string;
  status: "OK" | "NO";
  ids: string[];
}

export interface ClassProp {
  grade: number;
  class: number;
  type: string;
}

export interface ClubList {
  id: string;
  username: string;
  grade: number;
  class_num: number;
  num: number;
  status6: string;
  status7: string;
  status8: string;
  status9: string;
  status10: string;
}

export interface ChangeStatus {
  user_id: string;
  status_list: string[];
}
