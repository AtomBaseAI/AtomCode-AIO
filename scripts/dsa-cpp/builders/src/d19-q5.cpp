#include <bits/stdc++.h>
using namespace std;

long long knapsack_value(const std::vector<long long>& wt, const std::vector<long long>& val, long long W) {
    int n = (int)wt.size();
    std::vector<std::vector<long long>> dp(n + 1, std::vector<long long>(W + 1, 0));
    for (int i = 1; i <= n; i++)
        for (long long w = 0; w <= W; w++) {
            dp[i][w] = dp[i - 1][w];
            if (wt[i - 1] <= w) {
                long long take = dp[i - 1][w - wt[i - 1]] + val[i - 1];
                if (take > dp[i][w]) dp[i][w] = take;
            }
        }
    return dp[n][W];
}

int main() {
    int n;
    long long W;
    if (!(cin >> n >> W)) return 0;
    vector<long long> wt(n), val(n);
    for (auto& x : wt) cin >> x;
    for (auto& x : val) cin >> x;
    cout << knapsack_value(wt, val, W) << "\n";
    return 0;
}
