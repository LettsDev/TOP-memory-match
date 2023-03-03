export interface Animal {
  id: number;
  gender: string;
  status: string;
  url: string;
  photos: [{ small: string; medium: string; large: string; full: string }];
  primary_photo_cropped: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  published_at: string;
  name: string;
  description: string;
  attributes: {
    declawed: boolean | null;
    house_trained: boolean;
    shots_current: boolean;
    spayed_neutered: boolean;
    special_needs: boolean;
  };
  breeds: {
    primary: string;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  environment: {
    children: boolean | null;
    dogs: boolean | null;
    cats: boolean | null;
  };
}
export interface DataResponse {
  animals: [
    {
      id: number;
      gender: string;
      status: string;
      url: string;
      photos: [{ small: string; medium: string; large: string; full: string }];
      primary_photo_cropped: {
        small: string;
        medium: string;
        large: string;
        full: string;
      };
      published_at: string;
      name: string;
      description: string;
      attributes: {
        declawed: boolean | null;
        house_trained: boolean;
        shots_current: boolean;
        spayed_neutered: boolean;
        special_needs: boolean;
      };
      breeds: {
        primary: string;
        secondary: string | null;
        mixed: boolean;
        unknown: boolean;
      };
      environment: {
        children: boolean | null;
        dogs: boolean | null;
        cats: boolean | null;
      };
    }
  ];
}
