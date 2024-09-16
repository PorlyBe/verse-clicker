class Player {
  cookies: number;
  cookieStats: {
    Earned: number;
    Spent: number;
    Clicked: number;
  };

  aMPF: number;
  aMPC: number;

  prestige: number;

  constructor() {
    this.cookies = 0;
    this.cookieStats = {
      Earned: 0,
      Spent: 0,
      Clicked: 0,
    };
    this.aMPF = 0;
    this.aMPC = 1;
    this.prestige = 0;
  }
}

export default Player;
