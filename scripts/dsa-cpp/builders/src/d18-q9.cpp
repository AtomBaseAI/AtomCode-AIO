#include <bits/stdc++.h>
using namespace std;

int bus_fare_coins(int fare) {
    const int denoms[4] = {10, 5, 2, 1};
    int coins = 0;
    for (int i = 0; i < 4; i++) {
        coins += fare / denoms[i];
        fare %= denoms[i];
    }
    return coins;
}

int main() {
    int fare;
    cin >> fare;
    cout << bus_fare_coins(fare) << "\n";
    return 0;
}
