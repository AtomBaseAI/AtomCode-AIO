#include <bits/stdc++.h>
using namespace std;

int min_coins(int amount) {
    const int denoms[9] = {1000, 500, 100, 50, 20, 10, 5, 2, 1};
    int coins = 0;
    for (int i = 0; i < 9; i++) {
        coins += amount / denoms[i];
        amount %= denoms[i];
    }
    return coins;
}

int main() {
    int amount;
    cin >> amount;
    cout << min_coins(amount) << "\n";
    return 0;
}
