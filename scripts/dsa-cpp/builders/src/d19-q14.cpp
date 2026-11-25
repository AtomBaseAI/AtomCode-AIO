#include <bits/stdc++.h>
using namespace std;

int can_partition(const std::vector<long long>& val) {
    long long total = 0;
    for (long long v : val) total += v;
    if (total % 2 != 0) return 0;
    long long half = total / 2;
    std::vector<int> dp(half + 1, 0);
    dp[0] = 1;
    for (long long v : val)
        for (long long t = half; t >= v; t--)
            if (dp[t - v]) dp[t] = 1;
    return dp[half];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> val(n);
    for (auto& x : val) cin >> x;
    cout << can_partition(val) << "\n";
    return 0;
}
