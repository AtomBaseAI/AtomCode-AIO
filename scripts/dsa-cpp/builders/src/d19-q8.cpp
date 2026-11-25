#include <bits/stdc++.h>
using namespace std;

long long coin_ways(const std::vector<long long>& coins, long long amount) {
    std::vector<long long> dp(amount + 1, 0);
    dp[0] = 1;
    for (long long c : coins)
        for (long long a = c; a <= amount; a++)
            dp[a] += dp[a - c];
    return dp[amount];
}

int main() {
    int k;
    if (!(cin >> k)) return 0;
    vector<long long> coins(k);
    for (auto& x : coins) cin >> x;
    long long amount;
    cin >> amount;
    cout << coin_ways(coins, amount) << "\n";
    return 0;
}
