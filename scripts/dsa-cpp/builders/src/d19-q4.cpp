#include <bits/stdc++.h>
using namespace std;

long long min_climb_cost(const std::vector<long long>& cost) {
    int n = (int)cost.size();
    std::vector<long long> dp(n + 1, 0);
    for (int i = 2; i <= n; i++)
        dp[i] = std::min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    return dp[n];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> cost(n);
    for (auto& x : cost) cin >> x;
    cout << min_climb_cost(cost) << "\n";
    return 0;
}
