#include <bits/stdc++.h>
using namespace std;

long long min_coins(const std::vector<long long>& coins, long long amount) {
    std::vector<long long> dp(amount + 1, -1);
    dp[0] = 0;
    for (long long a = 1; a <= amount; a++)
        for (long long c : coins)
            if (c <= a && dp[a - c] != -1) {
                long long cand = dp[a - c] + 1;
                if (dp[a] == -1 || cand < dp[a]) dp[a] = cand;
            }
    return dp[amount];
}

int main() {
    int k;
    if (!(cin >> k)) return 0;
    vector<long long> coins(k);
    for (auto& x : coins) cin >> x;
    long long amount;
    cin >> amount;
    cout << min_coins(coins, amount) << "\n";
    return 0;
}
